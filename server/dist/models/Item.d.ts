import mongoose, { type Document } from "mongoose";
export interface IItem extends Document {
    user_id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    category: string;
    subcategory?: string;
    condition: "new" | "like-new" | "good" | "fair" | "poor";
    images: string[];
    location: {
        city: string;
        state: string;
        country: string;
        coordinates?: [number, number];
    };
    estimated_value: number;
    swap_preferences: string[];
    availability_status: "available" | "pending" | "swapped" | "unavailable";
    ai_tags: string[];
    sustainability_impact: {
        co2_saved: number;
        waste_diverted: number;
        category_impact: string;
    };
    created_at: Date;
    updated_at: Date;
}
export interface ISwapProposal extends Document {
    proposer_id: mongoose.Types.ObjectId;
    receiver_id: mongoose.Types.ObjectId;
    proposer_items: mongoose.Types.ObjectId[];
    receiver_items: mongoose.Types.ObjectId[];
    status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
    message?: string;
    compatibility_score: number;
    estimated_impact: {
        co2_saved: number;
        waste_diverted: number;
    };
    created_at: Date;
    updated_at: Date;
    completed_at?: Date;
}
export declare const Item: mongoose.Model<IItem, {}, {}, {}, mongoose.Document<unknown, {}, IItem, {}, {}> & IItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export declare const SwapProposal: mongoose.Model<ISwapProposal, {}, {}, {}, mongoose.Document<unknown, {}, ISwapProposal, {}, {}> & ISwapProposal & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Item.d.ts.map