import mongoose, { type Document } from "mongoose";
export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    full_name: string;
    avatar_url?: string;
    bio?: string;
    location?: string;
    sustainability_score: number;
    items_swapped: number;
    co2_saved: number;
    preferences: {
        categories: string[];
        max_distance: number;
        notification_settings: {
            email: boolean;
            push: boolean;
            swap_matches: boolean;
            messages: boolean;
            community_updates: boolean;
        };
        privacy_settings: {
            show_location: boolean;
            show_swap_history: boolean;
            show_sustainability_score: boolean;
        };
    };
    stats: {
        total_swaps: number;
        successful_swaps: number;
        co2_saved: number;
        waste_diverted: number;
        community_impact_score: number;
        badges_earned: string[];
        current_streak: number;
        longest_streak: number;
    };
    created_at: Date;
    updated_at: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map