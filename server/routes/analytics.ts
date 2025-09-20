import { Router, type Request, type Response } from "express"
import { Item } from "../models/Item"
import { Swap } from "../models/Swap"
import { User } from "../models/User"
import { CommunityPost } from "../models/Community"
import { authMiddleware } from "../middleware/auth"

const router = Router()

router.get("/dashboard", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId

    // User's items statistics
    const userItems = await Item.countDocuments({ userId })
    const availableItems = await Item.countDocuments({ userId, availabilityStatus: "available" })
    const swappedItems = await Item.countDocuments({ userId, availabilityStatus: "swapped" })

    // User's swap statistics
    const totalSwaps = await Swap.countDocuments({
      $or: [{ requesterId: userId }, { ownerId: userId }],
      status: "completed",
    })

    const pendingSwaps = await Swap.countDocuments({
      $or: [{ requesterId: userId }, { ownerId: userId }],
      status: "pending",
    })

    // User's sustainability impact
    const user = await User.findById(userId)
    const sustainabilityScore = user?.sustainability_score || 0

    // Recent activity
    const recentSwaps = await Swap.find({
      $or: [{ requesterId: userId }, { ownerId: userId }],
    })
      .populate("requestedItemId", "title")
      .populate("offeredItemId", "title")
      .sort({ createdAt: -1 })
      .limit(5)

    res.json({
      items: {
        total: userItems,
        available: availableItems,
        swapped: swappedItems,
      },
      swaps: {
        total: totalSwaps,
        pending: pendingSwaps,
      },
      sustainability: {
        score: sustainabilityScore,
        rank: await getUserSustainabilityRank(userId),
      },
      recentActivity: recentSwaps,
    })
  } catch (error) {
    console.error("Analytics fetch error:", error)
    res.status(500).json({ error: "Failed to fetch analytics" })
  }
})

router.get("/platform", async (req: Request, res: Response) => {
  try {
    // Platform-wide statistics
    const totalUsers = await User.countDocuments()
    const totalItems = await Item.countDocuments()
    const totalSwaps = await Swap.countDocuments({ status: "completed" })
    const totalPosts = await CommunityPost.countDocuments()

    // Monthly growth data
    const monthlyData = await getMonthlyGrowthData()

    // Category distribution
    const categoryStats = await Item.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Top users by sustainability score
    const topUsers = await User.find()
      .select("username sustainability_score totalSwaps")
      .sort({ sustainability_score: -1 })
      .limit(10)

    res.json({
      overview: {
        totalUsers,
        totalItems,
        totalSwaps,
        totalPosts,
      },
      growth: monthlyData,
      categories: categoryStats,
      topUsers,
    })
  } catch (error) {
    console.error("Platform analytics error:", error)
    res.status(500).json({ error: "Failed to fetch platform analytics" })
  }
})

// Helper functions
async function getUserSustainabilityRank(userId: string): Promise<number> {
  const user = await User.findById(userId)
  if (!user) return 0

  const rank = await User.countDocuments({
    sustainability_score: { $gt: user.sustainability_score },
  })

  return rank + 1
}

async function getMonthlyGrowthData() {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const userGrowth = await User.aggregate([
    { $match: { joinedAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$joinedAt" },
          month: { $month: "$joinedAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ])

  const swapGrowth = await Swap.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ])

  return { users: userGrowth, swaps: swapGrowth }
}

export default router
