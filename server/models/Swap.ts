import mongoose, { Schema, type Document } from "mongoose"

export interface ISwap extends Document {
  requesterId: mongoose.Types.ObjectId
  ownerId: mongoose.Types.ObjectId
  requestedItemId: mongoose.Types.ObjectId
  offeredItemId: mongoose.Types.ObjectId
  message?: string
  status: "pending" | "accepted" | "declined" | "completed" | "cancelled"
  compatibilityScore?: number
  estimatedImpact?: {
    co2_saved: number
    waste_diverted: number
  }
  createdAt: Date
  acceptedAt?: Date
  completedAt?: Date
}

const SwapSchema = new Schema<ISwap>({
  requesterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestedItemId: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  offeredItemId: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  message: {
    type: String,
    maxlength: 500,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "completed", "cancelled"],
    default: "pending",
  },
  compatibilityScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  estimatedImpact: {
    co2_saved: { type: Number, default: 0 },
    waste_diverted: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  acceptedAt: Date,
  completedAt: Date,
})

// Indexes for efficient queries
SwapSchema.index({ requesterId: 1, status: 1 })
SwapSchema.index({ ownerId: 1, status: 1 })
SwapSchema.index({ createdAt: -1 })

export const Swap = mongoose.model<ISwap>("Swap", SwapSchema)
