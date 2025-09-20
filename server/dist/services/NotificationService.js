"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const Notification_1 = require("../models/Notification");
class NotificationService {
    static setSocketIO(io) {
        this.io = io;
    }
    static async sendSwapRequest(swap) {
        try {
            if (this.io) {
                this.io.to(`user_${swap.ownerId}`).emit("swap_request", {
                    swapId: swap._id,
                    message: "You have a new swap request!",
                    requesterName: swap.requesterId.username,
                });
            }
            const notification = new Notification_1.Notification({
                userId: swap.ownerId,
                type: "swap_request",
                title: "New Swap Request",
                message: `You received a swap request from ${swap.requesterId.username}`,
                data: { swapId: swap._id },
                read: false,
            });
            await notification.save();
        }
        catch (error) {
            console.error("Failed to send swap request notification:", error);
        }
    }
    static async sendSwapStatusUpdate(swap) {
        try {
            const message = swap.status === "accepted" ? "Your swap request was accepted!" : "Your swap request was declined.";
            if (this.io) {
                this.io.to(`user_${swap.requesterId}`).emit("swap_status_update", {
                    swapId: swap._id,
                    status: swap.status,
                    message,
                });
            }
            const notification = new Notification_1.Notification({
                userId: swap.requesterId,
                type: "swap_status_update",
                title: `Swap ${swap.status === "accepted" ? "Accepted" : "Declined"}`,
                message,
                data: { swapId: swap._id, status: swap.status },
                read: false,
            });
            await notification.save();
        }
        catch (error) {
            console.error("Failed to send swap status notification:", error);
        }
    }
    static async sendChallengeUpdate(userId, challengeData) {
        try {
            if (this.io) {
                this.io.to(`user_${userId}`).emit("challenge_update", {
                    challengeId: challengeData._id,
                    message: `Challenge update: ${challengeData.title}`,
                });
            }
            const notification = new Notification_1.Notification({
                userId,
                type: "challenge_update",
                title: "Challenge Update",
                message: `Challenge update: ${challengeData.title}`,
                data: { challengeId: challengeData._id },
                read: false,
            });
            await notification.save();
        }
        catch (error) {
            console.error("Failed to send challenge notification:", error);
        }
    }
    static async markAsRead(notificationId, userId) {
        try {
            await Notification_1.Notification.findOneAndUpdate({ _id: notificationId, userId }, { read: true });
        }
        catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    }
    static async getUserNotifications(userId, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const notifications = await Notification_1.Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
            const total = await Notification_1.Notification.countDocuments({ userId });
            const unreadCount = await Notification_1.Notification.countDocuments({ userId, read: false });
            return {
                notifications,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
                unreadCount,
            };
        }
        catch (error) {
            console.error("Failed to fetch notifications:", error);
            throw error;
        }
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=NotificationService.js.map