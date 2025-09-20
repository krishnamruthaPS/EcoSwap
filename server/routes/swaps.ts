import { Router, type Request, type Response } from "express"
import { Swap } from "../models/Swap"
import { Item } from "../models/Item"
import { User } from "../models/User"
import { authMiddleware } from "../middleware/auth"
import { NotificationService } from "../services/NotificationService"

const router = Router()

// GET all swaps for the user with pagination
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const { status, page = "1", limit = "10" } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    const filter: any = {
      $or: [{ requesterId: userId }, { ownerId: userId }],
    }

    if (status) filter.status = status

    const swaps = await Swap.find(filter)
      .populate("requesterId", "username avatarUrl")
      .populate("ownerId", "username avatarUrl")
      .populate("requestedItemId")
      .populate("offeredItemId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    const total = await Swap.countDocuments(filter)

    return res.json({
      swaps,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    console.error("Swaps fetch error:", error)
    return res.status(500).json({ error: "Failed to fetch swaps" })
  }
})

// POST a new swap request
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const { requestedItemId, offeredItemId, message } = req.body

    const requestedItem = await Item.findById(requestedItemId)
    const offeredItem = await Item.findById(offeredItemId)

    if (!requestedItem || !offeredItem) {
      return res.status(404).json({ error: "One or both items not found" })
    }

    if (requestedItem.availability_status !== "available" || offeredItem.availability_status !== "available") {
      return res.status(400).json({ error: "One or both items are not available" })
    }

    if (offeredItem.user_id.toString() !== userId) {
      return res.status(403).json({ error: "You can only offer your own items" })
    }

    const swap = new Swap({
      requesterId: userId,
      ownerId: requestedItem.user_id,
      requestedItemId,
      offeredItemId,
      message,
      status: "pending",
    })

    await swap.save()
    await swap.populate(["requesterId", "ownerId", "requestedItemId", "offeredItemId"])

    await NotificationService.sendSwapRequest(swap)

    return res.status(201).json(swap)
  } catch (error) {
    console.error("Swap creation error:", error)
    return res.status(500).json({ error: "Failed to create swap request" })
  }
})

// PUT to update swap status
router.put("/:id/status", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const { status } = req.body

    const swap = await Swap.findById(req.params.id)
    if (!swap) return res.status(404).json({ error: "Swap not found" })

    if (swap.ownerId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    swap.status = status
    if (status === "accepted") {
      swap.acceptedAt = new Date()
      await Item.findByIdAndUpdate(swap.requestedItemId, { availability_status: "swapped" })
      await Item.findByIdAndUpdate(swap.offeredItemId, { availability_status: "swapped" })
      await User.findByIdAndUpdate(swap.requesterId, { $inc: { totalSwaps: 1, sustainabilityScore: 10 } })
      await User.findByIdAndUpdate(swap.ownerId, { $inc: { totalSwaps: 1, sustainabilityScore: 10 } })
    }

    await swap.save()
    await swap.populate(["requesterId", "ownerId", "requestedItemId", "offeredItemId"])
    await NotificationService.sendSwapStatusUpdate(swap)

    return res.json(swap)
  } catch (error) {
    console.error("Swap status update error:", error)
    return res.status(500).json({ error: "Failed to update swap status" })
  }
})

export default router
