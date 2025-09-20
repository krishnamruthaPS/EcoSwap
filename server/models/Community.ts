import mongoose, { Schema, Document, Types } from "mongoose"

// --------------------- CommunityPost ---------------------
export interface ICommunityPost extends Document {
  user_id: Types.ObjectId
  content: string
  images?: string[]
  post_type: "general" | "swap_story" | "tip" | "question" | "achievement"
  tags: string[]
  likes_count: number
  comments_count: number
  created_at: Date
  updated_at: Date
}

const CommunityPostSchema = new Schema<ICommunityPost>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    post_type: { 
      type: String, 
      enum: ["general", "swap_story", "tip", "question", "achievement"], 
      required: true 
    },
    tags: [{ type: String }],
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

export const CommunityPost = mongoose.model<ICommunityPost>(
  "CommunityPost",
  CommunityPostSchema
)


// --------------------- Challenge ---------------------
export interface IChallenge extends Document {
  title: string
  description: string
  challenge_type: "individual" | "community" | "global"
  category: string
  target_metric: string
  target_value: number
  duration_days: number
  reward_points: number
  reward_badge?: string
  start_date: Date
  end_date: Date
  participants: Types.ObjectId[] // store user IDs
  status: "upcoming" | "active" | "completed"
}

const ChallengeSchema = new Schema<IChallenge>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    challenge_type: { 
      type: String, 
      enum: ["individual", "community", "global"], 
      required: true 
    },
    category: { type: String, required: true },
    target_metric: { type: String, required: true },
    target_value: { type: Number, required: true },
    duration_days: { type: Number, required: true },
    reward_points: { type: Number, required: true },
    reward_badge: { type: String },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    status: { 
      type: String, 
      enum: ["upcoming", "active", "completed"], 
      default: "upcoming" 
    },
  },
  { timestamps: true }
)

export const Challenge = mongoose.model<IChallenge>("Challenge", ChallengeSchema)


// --------------------- UserChallenge ---------------------
export interface IUserChallenge extends Document {
  user_id: Types.ObjectId
  challenge_id: Types.ObjectId
  progress: number
  completed: boolean
  joined_at: Date
  completed_at?: Date
}

const UserChallengeSchema = new Schema<IUserChallenge>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    challenge_id: { type: Schema.Types.ObjectId, ref: "Challenge", required: true },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    joined_at: { type: Date, default: Date.now },
    completed_at: { type: Date },
  },
  { timestamps: false }
)

export const UserChallenge = mongoose.model<IUserChallenge>(
  "UserChallenge",
  UserChallengeSchema
)
