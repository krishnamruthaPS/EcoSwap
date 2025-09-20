"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Item_1 = require("../models/Item");
const Swap_1 = require("../models/Swap");
const User_1 = require("../models/User");
const Community_1 = require("../models/Community");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/dashboard", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const userItems = await Item_1.Item.countDocuments({ userId });
        const availableItems = await Item_1.Item.countDocuments({ userId, availabilityStatus: "available" });
        const swappedItems = await Item_1.Item.countDocuments({ userId, availabilityStatus: "swapped" });
        const totalSwaps = await Swap_1.Swap.countDocuments({
            $or: [{ requesterId: userId }, { ownerId: userId }],
            status: "completed",
        });
        const pendingSwaps = await Swap_1.Swap.countDocuments({
            $or: [{ requesterId: userId }, { ownerId: userId }],
            status: "pending",
        });
        const user = await User_1.User.findById(userId);
        const sustainabilityScore = user?.sustainability_score || 0;
        const recentSwaps = await Swap_1.Swap.find({
            $or: [{ requesterId: userId }, { ownerId: userId }],
        })
            .populate("requestedItemId", "title")
            .populate("offeredItemId", "title")
            .sort({ createdAt: -1 })
            .limit(5);
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
        });
    }
    catch (error) {
        console.error("Analytics fetch error:", error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});
router.get("/platform", async (req, res) => {
    try {
        const totalUsers = await User_1.User.countDocuments();
        const totalItems = await Item_1.Item.countDocuments();
        const totalSwaps = await Swap_1.Swap.countDocuments({ status: "completed" });
        const totalPosts = await Community_1.CommunityPost.countDocuments();
        const monthlyData = await getMonthlyGrowthData();
        const categoryStats = await Item_1.Item.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        const topUsers = await User_1.User.find()
            .select("username sustainability_score totalSwaps")
            .sort({ sustainability_score: -1 })
            .limit(10);
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
        });
    }
    catch (error) {
        console.error("Platform analytics error:", error);
        res.status(500).json({ error: "Failed to fetch platform analytics" });
    }
});
async function getUserSustainabilityRank(userId) {
    const user = await User_1.User.findById(userId);
    if (!user)
        return 0;
    const rank = await User_1.User.countDocuments({
        sustainability_score: { $gt: user.sustainability_score },
    });
    return rank + 1;
}
async function getMonthlyGrowthData() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const userGrowth = await User_1.User.aggregate([
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
    ]);
    const swapGrowth = await Swap_1.Swap.aggregate([
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
    ]);
    return { users: userGrowth, swaps: swapGrowth };
}
exports.default = router;
//# sourceMappingURL=analytics.js.map