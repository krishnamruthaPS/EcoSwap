import { Router, type Request, type Response } from "express"
import { User } from "../models/User"
import { authMiddleware } from "../middleware/auth"

interface AuthRequest extends Request {
  user?: { userId: string }
}

const router = Router()

router.get("/profile", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const user = await User.findById(req.user.userId).select('-password')
    
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.json(user)
  } catch (error) {
    console.error("Profile fetch error:", error)
    return res.status(500).json({ error: "Failed to fetch profile" })
  }
})

export default router
