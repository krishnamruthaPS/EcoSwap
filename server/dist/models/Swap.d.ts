import mongoose, { type Document } from "mongoose";
export interface ISwap extends Document {
    requesterId: mongoose.Types.ObjectId;
    ownerId: mongoose.Types.ObjectId;
    requestedItemId: mongoose.Types.ObjectId;
    offeredItemId: mongoose.Types.ObjectId;
    message?: string;
    status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
    compatibilityScore?: number;
    estimatedImpact?: {
        co2_saved: number;
        waste_diverted: number;
    };
    createdAt: Date;
    acceptedAt?: Date;
    completedAt?: Date;
}
export declare const Swap: mongoose.Model<ISwap, {}, {}, {}, mongoose.Document<unknown, {}, ISwap, {}, {}> & ISwap & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Swap.d.ts.map