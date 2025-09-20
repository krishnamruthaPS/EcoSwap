import { Router, type Request, type Response } from "express"
import { CommunityPost, Challenge } from "../models/Community"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// Posts routes
router.get("/posts", async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10", type } = req.query
    const pageNum = Number.parseInt(page as string)
    const limitNum = Number.parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    const filter: any = {}
    if (type) filter.type = type

    const posts = await CommunityPost.find(filter)
      .populate("authorId", "username avatarUrl sustainabilityScore")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    const total = await CommunityPost.countDocuments(filter)

    res.json({
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
    res.status(500).json({ error: "Failed to fetch posts" })
  }
})

router.post("/posts", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const { title, content, type, images, tags } = req.body

    const post = new CommunityPost({
      authorId: userId,
      title,
      content,
      type,
      images: images || [],
      tags: tags || [],
      likes: [],
      comments: [],
    })

    await post.save()
    await post.populate("authorId", "username avatarUrl sustainabilityScore")

    res.status(201).json(post)
  } catch (error) {
    console.error("Post creation error:", error)
    res.status(500).json({ error: "Failed to create post" })
  }
})

// Challenges routes
router.get("/challenges", async (req: Request, res: Response) => {
  try {
    const { status = "active" } = req.query

    const challenges = await Challenge.find({ status }).sort({ createdAt: -1 })

    res.json(challenges)
  } catch (error) {
    console.error("Challenges fetch error:", error)
    res.status(500).json({ error: "Failed to fetch challenges" })
  }
})

router.post("/challenges/:challengeId/join", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const { challengeId } = req.params

    const challenge = await Challenge.findById(challengeId)
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" })
    }

    if (!challenge.participants.map(id => id.toString()).includes(userId)) {
      challenge.participants.push(userId)
      await challenge.save()
    }

    res.json({ message: "Successfully joined challenge" })
    return
  } catch (error) {
    console.error("Challenge join error:", error)
    res.status(500).json({ error: "Failed to join challenge" })
    return
  }
})

export default router
