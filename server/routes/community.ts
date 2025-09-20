import { Router, type Request, type Response } from "express"
import { CommunityPost, Challenge, UserChallenge } from "../models/Community"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// ---------------- Posts routes ----------------
router.get("/posts", async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", type } = req.query
    const pageNum = Number.parseInt(page as string)
    const limitNum = Number.parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    const filter: any = {}
    if (type) filter.post_type = type

    const posts = await CommunityPost.find(filter)
      .populate("user_id", "username avatarUrl sustainabilityScore")
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limitNum)

    const total = await CommunityPost.countDocuments(filter)

    return res.json({
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    console.error("Posts fetch error:", error)
    return res.status(500).json({ error: "Failed to fetch posts" })
  }
})

router.post("/posts", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.userId
    const { content, post_type, images, tags } = req.body

    const post = new CommunityPost({
      user_id,
      content,
      post_type,
      images: images || [],
      tags: tags || [],
      likes_count: 0,
      comments_count: 0,
    })

    await post.save()
    await post.populate("user_id", "username avatarUrl sustainabilityScore")

    return res.status(201).json(post)
  } catch (error) {
    console.error("Post creation error:", error)
    return res.status(500).json({ error: "Failed to create post" })
  }
})

// ---------------- Challenges routes ----------------
router.get("/challenges", async (req: Request, res: Response) => {
  try {
    const { status = "active" } = req.query
    const challenges = await Challenge.find({ status }).sort({ start_date: -1 })
    return res.json(challenges)
  } catch (error) {
    console.error("Challenges fetch error:", error)
    return res.status(500).json({ error: "Failed to fetch challenges" })
  }
})

router.post("/challenges/:challengeId/join", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.userId
    const { challengeId } = req.params

    const challenge = await Challenge.findById(challengeId)
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" })
    }

    // Make sure participants array exists
    if (!challenge.participants) challenge.participants = []

    if (!challenge.participants.includes(user_id)) {
      challenge.participants.push(user_id)
      await challenge.save()
      return res.json({ message: "Successfully joined challenge" })
    } else {
      return res.status(400).json({ message: "Already joined this challenge" })
    }
  } catch (error) {
    console.error("Challenge join error:", error)
    return res.status(500).json({ error: "Failed to join challenge" })
  }
})

export default router
