import type { Server as SocketIOServer } from "socket.io";
export declare class NotificationService {
    private static io;
    static setSocketIO(io: SocketIOServer): void;
    static sendSwapRequest(swap: any): Promise<void>;
    static sendSwapStatusUpdate(swap: any): Promise<void>;
    static sendChallengeUpdate(userId: string, challengeData: any): Promise<void>;
    static markAsRead(notificationId: string, userId: string): Promise<void>;
    static getUserNotifications(userId: string, page?: number, limit?: number): Promise<{
        notifications: (import("mongoose").Document<unknown, {}, import("../models/Notification").INotification, {}, {}> & import("../models/Notification").INotification & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
        unreadCount: number;
    }>;
}
//# sourceMappingURL=NotificationService.d.ts.map