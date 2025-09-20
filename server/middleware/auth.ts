import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/User"

// Extend Request type to include user info
interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
  }
}

// Auth middleware (required token)
export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.header("Authorization")
    if (!authHeader) {
      res.status(401).json({ error: "No token provided" })
      return
    }

    const token = authHeader.replace("Bearer ", "")
    let decoded: any

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
    } catch {
      res.status(401).json({ error: "Invalid token" })
      return
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      res.status(401).json({ error: "User not found" })
      return
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    }

    next()
    return
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(500).json({ error: "Internal server error" })
    return
  }
}

// Optional auth middleware (token optional)
export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.header("Authorization")
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "")
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
        const user = await User.findById(decoded.userId)
        if (user) {
          req.user = {
            userId: decoded.userId,
            email: decoded.email,
          }
        }
      } catch {
        // token invalid, just ignore for optional auth
      }
    }
    next()
    return
  } catch (error) {
    console.error("Optional auth middleware error:", error)
    next() // always continue
    return
  }
}
