import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  email: string
  username: string
  password: string
  full_name: string
  avatar_url?: string
  bio?: string
  location?: string
  sustainability_score: number
  items_swapped: number
  co2_saved: number
  preferences: {
    categories: string[]
    max_distance: number
    notification_settings: {
      email: boolean
      push: boolean
      swap_matches: boolean
      messages: boolean
      community_updates: boolean
    }
    privacy_settings: {
      show_location: boolean
      show_swap_history: boolean
      show_sustainability_score: boolean
    }
  }
  stats: {
    total_swaps: number
    successful_swaps: number
    co2_saved: number
    waste_diverted: number
    community_impact_score: number
    badges_earned: string[]
    current_streak: number
    longest_streak: number
  }
  created_at: Date
  updated_at: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar_url: String,
    bio: {
      type: String,
      maxlength: 500,
    },
    location: String,
    sustainability_score: {
      type: Number,
      default: 0,
      min: 0,
    },
    items_swapped: {
      type: Number,
      default: 0,
      min: 0,
    },
    co2_saved: {
      type: Number,
      default: 0,
      min: 0,
    },
    preferences: {
      categories: [
        {
          type: String,
          enum: ["electronics", "clothing", "books", "home", "sports", "toys", "other"],
        },
      ],
      max_distance: {
        type: Number,
        default: 25,
        min: 1,
        max: 100,
      },
      notification_settings: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        swap_matches: { type: Boolean, default: true },
        messages: { type: Boolean, default: true },
        community_updates: { type: Boolean, default: false },
      },
      privacy_settings: {
        show_location: { type: Boolean, default: true },
        show_swap_history: { type: Boolean, default: true },
        show_sustainability_score: { type: Boolean, default: true },
      },
    },
    stats: {
      total_swaps: { type: Number, default: 0 },
      successful_swaps: { type: Number, default: 0 },
      co2_saved: { type: Number, default: 0 },
      waste_diverted: { type: Number, default: 0 },
      community_impact_score: { type: Number, default: 0 },
      badges_earned: [String],
      current_streak: { type: Number, default: 0 },
      longest_streak: { type: Number, default: 0 },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

export const User = mongoose.model<IUser>("User", UserSchema)
