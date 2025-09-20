"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotificationService_1 = require("../services/NotificationService");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { page = "1", limit = "20" } = req.query;
        const result = await NotificationService_1.NotificationService.getUserNotifications(userId, Number.parseInt(page), Number.parseInt(limit));
        res.json(result);
    }
    catch (error) {
        console.error("Notifications fetch error:", error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});
router.put("/:id/read", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const notificationId = req.params.id;
        await NotificationService_1.NotificationService.markAsRead(notificationId, userId);
        res.json({ message: "Notification marked as read" });
    }
    catch (error) {
        console.error("Mark notification read error:", error);
        res.status(500).json({ error: "Failed to mark notification as read" });
    }
});
exports.default = router;
//# sourceMappingURL=notifications.js.map