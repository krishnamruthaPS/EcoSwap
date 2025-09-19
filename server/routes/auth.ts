import { Router, type Request, type Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/User"

const router = Router()

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, username, fullName } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      username,
      fullName,
      sustainabilityScore: 0,
      totalSwaps: 0,
      joinedAt: new Date(),
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "fallback-secret", {
      expiresIn: "7d",
    })

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        sustainabilityScore: user.sustainabilityScore,
      },
      token,
    })
  } catch (error) {
    console.error("Signup error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "fallback-secret", {
      expiresIn: "7d",
    })

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        sustainabilityScore: user.sustainabilityScore,
      },
      token,
    })
  } catch (error) {
    console.error("Signin error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/signout", (req: Request, res: Response) => {
  // In JWT-based auth, signout is handled client-side by removing the token
  res.json({ message: "Signed out successfully" })
})

export default router
