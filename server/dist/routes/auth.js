"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.post("/signup", async (req, res) => {
    try {
        const { email, password, username, fullName } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const user = new User_1.User({
            email,
            password: hashedPassword,
            username,
            full_name: fullName,
            sustainability_score: 0,
            items_swapped: 0,
            joinedAt: new Date(),
        });
        await user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "fallback-secret", {
            expiresIn: "7d",
        });
        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                fullName: user.full_name,
                sustainabilityScore: user.sustainability_score,
            },
            token,
        });
        return;
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "fallback-secret", {
            expiresIn: "7d",
        });
        res.json({
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                fullName: user.full_name,
                sustainabilityScore: user.sustainability_score,
            },
            token,
        });
        return;
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
});
router.post("/signout", (req, res) => {
    res.json({ message: "Signed out successfully" });
});
exports.default = router;
//# sourceMappingURL=auth.js.map