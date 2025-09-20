import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { createServer } from "http"
import { Server as SocketIOServer } from "socket.io"
import { connectDB } from "./config/database"
import { NotificationService } from "./services/NotificationService"
import userRoutes from "./routes/user" 


// Import routes
import authRoutes from "./routes/auth"
import itemRoutes from "./routes/items"
import swapRoutes from "./routes/swaps"
import communityRoutes from "./routes/community"
import analyticsRoutes from "./routes/analytics"
import notificationRoutes from "./routes/notifications"

const app = express()
const server = createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

// Middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(morgan("combined"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/swaps", swapRoutes)
app.use("/api/community", communityRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/notifications", notificationRoutes)

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  // Join user-specific room for notifications
  socket.on("join_user_room", (userId) => {
    socket.join(`user_${userId}`)
    console.log(`User ${userId} joined their notification room`)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

// Set up notification service with Socket.IO
NotificationService.setSocketIO(io)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err)
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

const PORT = process.env.PORT || 5000

// Start server
const startServer = async () => {
  try {
    await connectDB()
    console.log("Database connected successfully")

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()

export default app
