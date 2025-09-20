import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./config/database"
import authRoutes from "./routes/auth"
import itemRoutes from "./routes/items"
import swapRoutes from "./routes/swaps"
import communityRoutes from "./routes/community"
import analyticsRoutes from "./routes/analytics"
// Removed missing businessRoutes import

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
)
app.use(morgan("combined"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
// Removed missing rateLimiter import

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/swaps", swapRoutes)
app.use("/api/community", communityRoutes)
app.use("/api/analytics", analyticsRoutes)
// Removed missing businessRoutes import

// Health check
import { Request, Response } from "express"

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() })
})

// Error handling
// Removed missing errorHandler import
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`🚀 EcoSwap server running on port ${PORT}`)
})

export default app
