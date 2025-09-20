import mongoose from "mongoose"

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://Krishnamrutha:EABWVdHHnNIx4CG9@ecoswap.ydqp0a1.mongodb.net/EcoSwap?retryWrites=true&w=majority&appName=Ecoswap"

    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    console.log("✅ MongoDB connected successfully")
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
    process.exit(1)
  }
}

// MongoDB connection event handlers
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error)
})

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected")
})

process.on("SIGINT", async () => {
  await mongoose.connection.close()
  console.log("MongoDB connection closed through app termination")
  process.exit(0)
})
