import mongoose, { Document } from "mongoose";
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
export declare const CommunityPost: mongoose.Model<ICommunityPost, {}, {}, {}, mongoose.Document<unknown, {}, ICommunityPost, {}, {}> & ICommunityPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
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
export declare const Challenge: mongoose.Model<IChallenge, {}, {}, {}, mongoose.Document<unknown, {}, IChallenge, {}, {}> & IChallenge & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export interface CommunityPost {
    id: string;
    user_id: string;
    content: string;
    images?: string[];
    post_type: "general" | "swap_story" | "tip" | "question" | "achievement";
    tags: string[];
    likes_count: number;
    comments_count: number;
    created_at: Date;
    updated_at: Date;
}
export interface Challenge {
    id: string;
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
}
export interface UserChallenge {
    user_id: string;
    challenge_id: string;
    progress: number;
    completed: boolean;
    joined_at: Date;
    completed_at?: Date;
}
//# sourceMappingURL=Community.d.ts.map