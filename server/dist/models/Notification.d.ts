import mongoose, { type Document } from "mongoose";
export interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    type: "swap_request" | "swap_status_update" | "challenge_update" | "system";
    title: string;
    message: string;
    data?: any;
    read: boolean;
    createdAt: Date;
}
export declare const Notification: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification, {}, {}> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Notification.d.ts.map