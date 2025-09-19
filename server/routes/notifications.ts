import { Router, type Request, type Response } from "express"
import { NotificationService } from "../services/NotificationService"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// Get user notifications
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const { page = "1", limit = "20" } = req.query

    const result = await NotificationService.getUserNotifications(
      userId,
      Number.parseInt(page as string),
      Number.parseInt(limit as string),
    )

    res.json(result)
  } catch (error) {
    console.error("Notifications fetch error:", error)
    res.status(500).json({ error: "Failed to fetch notifications" })
  }
})

// Mark notification as read
router.put("/:id/read", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const notificationId = req.params.id

    await NotificationService.markAsRead(notificationId, userId)
    res.json({ message: "Notification marked as read" })
  } catch (error) {
    console.error("Mark notification read error:", error)
    res.status(500).json({ error: "Failed to mark notification as read" })
  }
})

export default router
