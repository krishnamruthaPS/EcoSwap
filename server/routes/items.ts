import { Router, type Request, type Response } from "express"
import { Item } from "../models/Item"
import { AIService } from "../services/AIService"
import { authMiddleware } from "../middleware/auth"

const router = Router()

// GET all items with filters & pagination
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, location, condition, page = "1", limit = "12" } = req.query
    const pageNum = Number(page)
    const limitNum = Number(limit)
    const skip = (pageNum - 1) * limitNum

    const filter: any = { availabilityStatus: "available" }
    if (category) filter.category = category
    if (condition) filter.condition = condition
    if (location) filter["location.city"] = { $regex: location, $options: "i" }

    const items = await Item.find(filter)
      .populate("userId", "username avatarUrl sustainabilityScore")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    const total = await Item.countDocuments(filter)

    return res.json({
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
    return res.status(500).json({ error: "Failed to fetch items" })
  }
})

// POST create new item
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const itemData = req.body
    const userId = (req as any).user.userId

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

    return res.status(201).json(item)
  } catch (error) {
    console.error("Item creation error:", error)
    return res.status(500).json({ error: "Failed to create item" })
  }
})

// GET single item by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).populate("userId", "username avatarUrl sustainabilityScore")
    if (!item) return res.status(404).json({ error: "Item not found" })
    return res.json(item)
  } catch (error) {
    console.error("Item fetch error:", error)
    return res.status(500).json({ error: "Failed to fetch item" })
  }
})

// PUT update item by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const item = await Item.findOne({ _id: req.params.id, userId })
    if (!item) return res.status(404).json({ error: "Item not found or unauthorized" })

    Object.assign(item, req.body)
    await item.save()
    await item.populate("userId", "username avatarUrl sustainabilityScore")

    return res.json(item)
  } catch (error) {
    console.error("Item update error:", error)
    return res.status(500).json({ error: "Failed to update item" })
  }
})

// DELETE item by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const item = await Item.findOneAndDelete({ _id: req.params.id, userId })
    if (!item) return res.status(404).json({ error: "Item not found or unauthorized" })

    return res.json({ message: "Item deleted successfully" })
  } catch (error) {
    console.error("Item deletion error:", error)
    return res.status(500).json({ error: "Failed to delete item" })
  }
})

export default router
