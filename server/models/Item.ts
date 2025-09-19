import mongoose, { type Document, Schema } from "mongoose"

export interface IItem extends Document {
  user_id: mongoose.Types.ObjectId
  title: string
  description: string
  category: string
  subcategory?: string
  condition: "new" | "like-new" | "good" | "fair" | "poor"
  images: string[]
  location: {
    city: string
    state: string
    country: string
    coordinates?: [number, number]
  }
  estimated_value: number
  swap_preferences: string[]
  availability_status: "available" | "pending" | "swapped" | "unavailable"
  ai_tags: string[]
  sustainability_impact: {
    co2_saved: number
    waste_diverted: number
    category_impact: string
  }
  created_at: Date
  updated_at: Date
}

export interface ISwapProposal extends Document {
  proposer_id: mongoose.Types.ObjectId
  receiver_id: mongoose.Types.ObjectId
  proposer_items: mongoose.Types.ObjectId[]
  receiver_items: mongoose.Types.ObjectId[]
  status: "pending" | "accepted" | "declined" | "completed" | "cancelled"
  message?: string
  compatibility_score: number
  estimated_impact: {
    co2_saved: number
    waste_diverted: number
  }
  created_at: Date
  updated_at: Date
  completed_at?: Date
}

const ItemSchema = new Schema<IItem>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
      enum: ["electronics", "clothing", "books", "home", "sports", "toys", "other"],
    },
    subcategory: String,
    condition: {
      type: String,
      required: true,
      enum: ["new", "like-new", "good", "fair", "poor"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    estimated_value: {
      type: Number,
      required: true,
      min: 0,
    },
    swap_preferences: [String],
    availability_status: {
      type: String,
      enum: ["available", "pending", "swapped", "unavailable"],
      default: "available",
    },
    ai_tags: [String],
    sustainability_impact: {
      co2_saved: { type: Number, default: 0 },
      waste_diverted: { type: Number, default: 0 },
      category_impact: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
)

const SwapProposalSchema = new Schema<ISwapProposal>(
  {
    proposer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    proposer_items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
    ],
    receiver_items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed", "cancelled"],
      default: "pending",
    },
    message: {
      type: String,
      maxlength: 500,
    },
    compatibility_score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    estimated_impact: {
      co2_saved: { type: Number, default: 0 },
      waste_diverted: { type: Number, default: 0 },
    },
    completed_at: Date,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
)

// Indexes for better query performance
ItemSchema.index({ user_id: 1, availability_status: 1 })
ItemSchema.index({ category: 1, availability_status: 1 })
ItemSchema.index({ "location.coordinates": "2dsphere" })
ItemSchema.index({ created_at: -1 })

SwapProposalSchema.index({ proposer_id: 1, status: 1 })
SwapProposalSchema.index({ receiver_id: 1, status: 1 })
SwapProposalSchema.index({ created_at: -1 })

export const Item = mongoose.model<IItem>("Item", ItemSchema)
export const SwapProposal = mongoose.model<ISwapProposal>("SwapProposal", SwapProposalSchema)
