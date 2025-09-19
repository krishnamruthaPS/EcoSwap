import type { Server as SocketIOServer } from "socket.io"
import { Notification } from "../models/Notification"

export class NotificationService {
  private static io: SocketIOServer

  static setSocketIO(io: SocketIOServer) {
    this.io = io
  }

  static async sendSwapRequest(swap: any): Promise<void> {
    try {
      // Send real-time notification via Socket.IO
      if (this.io) {
        this.io.to(`user_${swap.ownerId}`).emit("swap_request", {
          swapId: swap._id,
          message: "You have a new swap request!",
          requesterName: swap.requesterId.username,
        })
      }

      // Store notification in database
      const notification = new Notification({
        userId: swap.ownerId,
        type: "swap_request",
        title: "New Swap Request",
        message: `You received a swap request from ${swap.requesterId.username}`,
        data: { swapId: swap._id },
        read: false,
      })

      await notification.save()
    } catch (error) {
      console.error("Failed to send swap request notification:", error)
    }
  }

  static async sendSwapStatusUpdate(swap: any): Promise<void> {
    try {
      const message = swap.status === "accepted" ? "Your swap request was accepted!" : "Your swap request was declined."

      // Send real-time notification
      if (this.io) {
        this.io.to(`user_${swap.requesterId}`).emit("swap_status_update", {
          swapId: swap._id,
          status: swap.status,
          message,
        })
      }

      // Store notification in database
      const notification = new Notification({
        userId: swap.requesterId,
        type: "swap_status_update",
        title: `Swap ${swap.status === "accepted" ? "Accepted" : "Declined"}`,
        message,
        data: { swapId: swap._id, status: swap.status },
        read: false,
      })

      await notification.save()
    } catch (error) {
      console.error("Failed to send swap status notification:", error)
    }
  }

  static async sendChallengeUpdate(userId: string, challengeData: any): Promise<void> {
    try {
      // Send real-time notification
      if (this.io) {
        this.io.to(`user_${userId}`).emit("challenge_update", {
          challengeId: challengeData._id,
          message: `Challenge update: ${challengeData.title}`,
        })
      }

      // Store notification in database
      const notification = new Notification({
        userId,
        type: "challenge_update",
        title: "Challenge Update",
        message: `Challenge update: ${challengeData.title}`,
        data: { challengeId: challengeData._id },
        read: false,
      })

      await notification.save()
    } catch (error) {
      console.error("Failed to send challenge notification:", error)
    }
  }

  static async markAsRead(notificationId: string, userId: string): Promise<void> {
    try {
      await Notification.findOneAndUpdate({ _id: notificationId, userId }, { read: true })
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  static async getUserNotifications(userId: string, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit

      const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit)

      const total = await Notification.countDocuments({ userId })
      const unreadCount = await Notification.countDocuments({ userId, read: false })

      return {
        notifications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        unreadCount,
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
      throw error
    }
  }
}
