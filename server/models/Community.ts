import mongoose, { Schema, Document } from "mongoose"

export interface ICommunityPost extends Document {
  user_id: mongoose.Types.ObjectId;
  content: string;
  images?: string[];
  post_type: "general" | "swap_story" | "tip" | "question" | "achievement";
  tags: string[];
  likes_count: number;
  comments_count: number;
  created_at: Date;
  updated_at: Date;
}

const CommunityPostSchema = new Schema<ICommunityPost>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  images: [String],
  post_type: { type: String, enum: ["general", "swap_story", "tip", "question", "achievement"], required: true },
  tags: [String],
  likes_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

export const CommunityPost = mongoose.model<ICommunityPost>("CommunityPost", CommunityPostSchema)

export interface IChallenge extends Document {
  title: string;
  description: string;
  challenge_type: "individual" | "community" | "global";
  category: string;
  target_metric: string;
  target_value: number;
  duration_days: number;
  reward_points: number;
  reward_badge?: string;
  start_date: Date;
  end_date: Date;
  participants_count: number;
  status: "upcoming" | "active" | "completed";
  participants: mongoose.Types.ObjectId[];
}

const ChallengeSchema = new Schema<IChallenge>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  challenge_type: { type: String, enum: ["individual", "community", "global"], required: true },
  category: { type: String, required: true },
  target_metric: { type: String, required: true },
  target_value: { type: Number, required: true },
  duration_days: { type: Number, required: true },
  reward_points: { type: Number, required: true },
  reward_badge: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  participants_count: { type: Number, default: 0 },
  status: { type: String, enum: ["upcoming", "active", "completed"], required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
})

export const Challenge = mongoose.model<IChallenge>("Challenge", ChallengeSchema)

export interface CommunityPost {
  id: string
  user_id: string
  content: string
  images?: string[]
  post_type: "general" | "swap_story" | "tip" | "question" | "achievement"
  tags: string[]
  likes_count: number
  comments_count: number
  created_at: Date
  updated_at: Date
}

export interface Challenge {
  id: string
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
  participants_count: number
  status: "upcoming" | "active" | "completed"
}

export interface UserChallenge {
  user_id: string
  challenge_id: string
  progress: number
  completed: boolean
  joined_at: Date
  completed_at?: Date
}
