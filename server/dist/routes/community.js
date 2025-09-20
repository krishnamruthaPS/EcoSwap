"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Community_1 = require("../models/Community");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/posts", async (req, res) => {
    try {
        const { page = "1", limit = "10", type } = req.query;
        const pageNum = Number.parseInt(page);
        const limitNum = Number.parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const filter = {};
        if (type)
            filter.type = type;
        const posts = await Community_1.CommunityPost.find(filter)
            .populate("authorId", "username avatarUrl sustainabilityScore")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        const total = await Community_1.CommunityPost.countDocuments(filter);
        res.json({
            posts,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum),
            },
        });
    }
    catch (error) {
        console.error("Posts fetch error:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});
router.post("/posts", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, content, type, images, tags } = req.body;
        const post = new Community_1.CommunityPost({
            authorId: userId,
            title,
            content,
            type,
            images: images || [],
            tags: tags || [],
            likes: [],
            comments: [],
        });
        await post.save();
        await post.populate("authorId", "username avatarUrl sustainabilityScore");
        res.status(201).json(post);
    }
    catch (error) {
        console.error("Post creation error:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
});
router.get("/challenges", async (req, res) => {
    try {
        const { status = "active" } = req.query;
        const challenges = await Community_1.Challenge.find({ status }).sort({ createdAt: -1 });
        res.json(challenges);
    }
    catch (error) {
        console.error("Challenges fetch error:", error);
        res.status(500).json({ error: "Failed to fetch challenges" });
    }
});
router.post("/challenges/:challengeId/join", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { challengeId } = req.params;
        const challenge = await Community_1.Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ error: "Challenge not found" });
        }
        if (!challenge.participants.map(id => id.toString()).includes(userId)) {
            challenge.participants.push(userId);
            await challenge.save();
        }
        res.json({ message: "Successfully joined challenge" });
        return;
    }
    catch (error) {
        console.error("Challenge join error:", error);
        res.status(500).json({ error: "Failed to join challenge" });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=community.js.map