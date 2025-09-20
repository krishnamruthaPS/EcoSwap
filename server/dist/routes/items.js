"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Item_1 = require("../models/Item");
const AIService_1 = require("../services/AIService");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const { category, location, condition, page = "1", limit = "12" } = req.query;
        const pageNum = Number.parseInt(page);
        const limitNum = Number.parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const filter = { availabilityStatus: "available" };
        if (category)
            filter.category = category;
        if (condition)
            filter.condition = condition;
        if (location) {
            filter["location.city"] = { $regex: location, $options: "i" };
        }
        const items = await Item_1.Item.find(filter)
            .populate("userId", "username avatarUrl sustainabilityScore")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        const total = await Item_1.Item.countDocuments(filter);
        res.json({
            items,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum),
            },
        });
    }
    catch (error) {
        console.error("Items fetch error:", error);
        res.status(500).json({ error: "Failed to fetch items" });
    }
});
router.post("/", auth_1.authMiddleware, async (req, res) => {
    try {
        const itemData = req.body;
        const userId = req.user.userId;
        const aiTags = await AIService_1.AIService.classifyItem(itemData.description, itemData.images);
        const sustainabilityImpact = await AIService_1.AIService.calculateSustainabilityImpact(itemData);
        const item = new Item_1.Item({
            userId,
            title: itemData.title,
            description: itemData.description,
            category: itemData.category,
            subcategory: itemData.subcategory,
            condition: itemData.condition,
            images: itemData.images,
            location: itemData.location,
            estimatedValue: itemData.estimatedValue,
            swapPreferences: itemData.swapPreferences,
            aiTags,
            sustainabilityImpact,
            availabilityStatus: "available",
        });
        await item.save();
        await item.populate("userId", "username avatarUrl sustainabilityScore");
        res.status(201).json(item);
        return;
    }
    catch (error) {
        console.error("Item creation error:", error);
        res.status(500).json({ error: "Failed to create item" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const item = await Item_1.Item.findById(req.params.id).populate("userId", "username avatarUrl sustainabilityScore");
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
        return;
    }
    catch (error) {
        console.error("Item fetch error:", error);
        res.status(500).json({ error: "Failed to fetch item" });
        return;
    }
});
router.put("/:id", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const item = await Item_1.Item.findOne({ _id: req.params.id, userId });
        if (!item) {
            return res.status(404).json({ error: "Item not found or unauthorized" });
        }
        Object.assign(item, req.body);
        await item.save();
        await item.populate("userId", "username avatarUrl sustainabilityScore");
        res.json(item);
        return;
    }
    catch (error) {
        console.error("Item update error:", error);
        res.status(500).json({ error: "Failed to update item" });
        return;
    }
});
router.delete("/:id", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const item = await Item_1.Item.findOneAndDelete({ _id: req.params.id, userId });
        if (!item) {
            return res.status(404).json({ error: "Item not found or unauthorized" });
        }
        res.json({ message: "Item deleted successfully" });
        return;
    }
    catch (error) {
        console.error("Item deletion error:", error);
        res.status(500).json({ error: "Failed to delete item" });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=items.js.map