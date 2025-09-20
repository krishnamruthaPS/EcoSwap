"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Swap_1 = require("../models/Swap");
const Item_1 = require("../models/Item");
const auth_1 = require("../middleware/auth");
const NotificationService_1 = require("../services/NotificationService");
const router = (0, express_1.Router)();
router.get("/", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { status, page = "1", limit = "10" } = req.query;
        const pageNum = Number.parseInt(page);
        const limitNum = Number.parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const filter = {
            $or: [{ requesterId: userId }, { ownerId: userId }],
        };
        if (status)
            filter.status = status;
        const swaps = await Swap_1.Swap.find(filter)
            .populate("requesterId", "username avatarUrl")
            .populate("ownerId", "username avatarUrl")
            .populate("requestedItemId")
            .populate("offeredItemId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        const total = await Swap_1.Swap.countDocuments(filter);
        res.json({
            swaps,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum),
            },
        });
    }
    catch (error) {
        console.error("Swaps fetch error:", error);
        res.status(500).json({ error: "Failed to fetch swaps" });
    }
});
router.post("/", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { requestedItemId, offeredItemId, message } = req.body;
        const requestedItem = await Item_1.Item.findById(requestedItemId);
        const offeredItem = await Item_1.Item.findById(offeredItemId);
        if (!requestedItem || !offeredItem) {
            return res.status(404).json({ error: "One or both items not found" });
        }
        if (requestedItem.availability_status !== "available" || offeredItem.availability_status !== "available") {
            return res.status(400).json({ error: "One or both items are not available" });
        }
        if (offeredItem.user_id.toString() !== userId) {
            return res.status(403).json({ error: "You can only offer your own items" });
        }
        const swap = new Swap_1.Swap({
            requesterId: userId,
            ownerId: requestedItem.user_id,
            requestedItemId,
            offeredItemId,
            message,
            status: "pending",
        });
        await swap.save();
        await swap.populate(["requesterId", "ownerId", "requestedItemId", "offeredItemId"]);
        await NotificationService_1.NotificationService.sendSwapRequest(swap);
        return res.status(201).json(swap);
    }
    catch (error) {
        console.error("Swap creation error:", error);
        return res.status(500).json({ error: "Failed to create swap request" });
    }
});
router.put("/:id/status", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { status } = req.body;
        const swap = await Swap_1.Swap.findById(req.params.id);
        if (!swap) {
            return res.status(404).json({ error: "Swap not found" });
        }
        if (swap.ownerId.toString() !== userId && swap.requesterId.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to update this swap" });
        }
        const validStatuses = ["pending", "accepted", "declined", "completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }
        swap.status = status;
        await swap.save();
        await NotificationService_1.NotificationService.sendSwapStatusUpdate(swap);
        return res.json(swap);
    }
    catch (error) {
        console.error("Swap status update error:", error);
        return res.status(500).json({ error: "Failed to update swap status" });
    }
});
exports.default = router;
//# sourceMappingURL=swaps.js.map