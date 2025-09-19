import { Router, type Request, type Response } from "express"
import { Item } from "../models/Item"
import { AIService } from "../services/AIService"
import { authMiddleware } from "../middleware/auth"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, location, condition, page = "1", limit = "12" } = req.query
    const pageNum = Number.parseInt(page as string)
    const limitNum = Number.parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    // Build query filter
    const filter: any = { availabilityStatus: "available" }

    if (category) filter.category = category
    if (condition) filter.condition = condition
    if (location) {
      filter["location.city"] = { $regex: location, $options: "i" }
    }

    // Get items with user data
    const items = await Item.find(filter)
      .populate("userId", "username avatarUrl sustainabilityScore")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    const total = await Item.countDocuments(filter)

    res.json({
      items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    console.error("Items fetch error:", error)
    res.status(500).json({ error: "Failed to fetch items" })
  }
})

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const itemData = req.body
    const userId = (req as any).user.userId

    // AI classification for the item
    const aiTags = await AIService.classifyItem(itemData.description, itemData.images)
    const sustainabilityImpact = await AIService.calculateSustainabilityImpact(itemData)

    const item = new Item({
      userId,
      title: itemData.title,
      description: itemData.description,
      category: itemData.category,
      subcategory: itemData.subcategory,
      condition: itemData.condition,
      images: itemData.images,
      location: itemData.location,
      estimatedValue: itemData.estimatedValue,
      swapPreferences: itemData.swapPreferences,
      aiTags,
      sustainabilityImpact,
      availabilityStatus: "available",
    })

    await item.save()
    await item.populate("userId", "username avatarUrl sustainabilityScore")

    res.status(201).json(item)
  } catch (error) {
    console.error("Item creation error:", error)
    res.status(500).json({ error: "Failed to create item" })
  }
})

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).populate("userId", "username avatarUrl sustainabilityScore")

    if (!item) {
      return res.status(404).json({ error: "Item not found" })
    }

    res.json(item)
  } catch (error) {
    console.error("Item fetch error:", error)
    res.status(500).json({ error: "Failed to fetch item" })
  }
})

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const item = await Item.findOne({ _id: req.params.id, userId })

    if (!item) {
      return res.status(404).json({ error: "Item not found or unauthorized" })
    }

    Object.assign(item, req.body)
    await item.save()
    await item.populate("userId", "username avatarUrl sustainabilityScore")

    res.json(item)
  } catch (error) {
    console.error("Item update error:", error)
    res.status(500).json({ error: "Failed to update item" })
  }
})

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const item = await Item.findOneAndDelete({ _id: req.params.id, userId })

    if (!item) {
      return res.status(404).json({ error: "Item not found or unauthorized" })
    }

    res.json({ message: "Item deleted successfully" })
  } catch (error) {
    console.error("Item deletion error:", error)
    res.status(500).json({ error: "Failed to delete item" })
  }
})

export default router
