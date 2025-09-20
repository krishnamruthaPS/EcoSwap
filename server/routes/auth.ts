import { Router, type Request, type Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/User"

const router = Router()

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, username, fullName, full_name } = req.body
    // Use fullName if present, else full_name

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Check required fields
    if (!email || !password || !username || !(fullName || full_name)) {
      console.error('Signup failed: Missing required fields', { email, password, username, fullName, full_name });
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Create new user with all required fields (no manual password hashing)
    const user = new User({
      email,
      password, // pass raw password, let pre-save hook hash it
      username,
      full_name: fullName || full_name,
      sustainability_score: 0,
      items_swapped: 0,
      co2_saved: 0,
      preferences: {
        categories: [],
        max_distance: 25,
        notification_settings: {
          email: true,
          push: true,
          swap_matches: true,
          messages: true,
          community_updates: false,
        },
        privacy_settings: {
          show_location: true,
          show_swap_history: true,
          show_sustainability_score: true,
        },
      },
      stats: {
        total_swaps: 0,
        successful_swaps: 0,
        co2_saved: 0,
        waste_diverted: 0,
        community_impact_score: 0,
        badges_earned: [],
        current_streak: 0,
        longest_streak: 0,
      },
      created_at: new Date(),
      updated_at: new Date(),
    })

    try {
      const savedUser = await user.save()
      console.log('User saved:', savedUser)
      if (!savedUser || !savedUser._id) {
        return res.status(500).json({ error: 'User not saved to database' })
      }
    } catch (saveError) {
      console.error('User save error:', saveError)
      return res.status(500).json({ error: 'Failed to save user', details: saveError })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "fallback-secret", {
      expiresIn: "7d",
    })

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        sustainabilityScore: user.sustainability_score,
      },
      token,
    })
    return
  } catch (error) {
    console.error("Signup error:", error)
    res.status(500).json({ error: "Internal server error" })
    return
  }
})

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Signin request:", { email, password });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ error: "User not found" });
    }
    console.log("User found:", user.email);

    // Use model's comparePassword method
    const isValidPassword = await user.comparePassword(password);
    console.log("Password valid:", isValidPassword);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

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
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
})

router.post("/signout", (req: Request, res: Response) => {
  // In JWT-based auth, signout is handled client-side by removing the token
  res.json({ message: "Signed out successfully" })
})

export default router
