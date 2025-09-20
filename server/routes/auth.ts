import { Router, type Request, type Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/User"

const router = Router()

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, username, full_name } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ error: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      email,
      password: hashedPassword,
      username,
      full_name,
      sustainability_score: 0,
      totalSwaps: 0,
      joinedAt: new Date(),
    })

    await user.save()

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    )

    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        sustainability_score: user.sustainability_score,
      },
      token,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: "Invalid credentials" })

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) return res.status(400).json({ error: "Invalid credentials" })

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    )

    return res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        sustainability_score: user.sustainability_score,
      },
      token,
    })
  } catch (error) {
    console.error("Signin error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/signout", (req: Request, res: Response) => {
  return res.json({ message: "Signed out successfully" })
})

export default router
