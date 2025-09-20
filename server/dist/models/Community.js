"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenge = exports.CommunityPost = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CommunityPostSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    images: [String],
    post_type: { type: String, enum: ["general", "swap_story", "tip", "question", "achievement"], required: true },
    tags: [String],
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.CommunityPost = mongoose_1.default.model("CommunityPost", CommunityPostSchema);
const ChallengeSchema = new mongoose_1.Schema({
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
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
});
exports.Challenge = mongoose_1.default.model("Challenge", ChallengeSchema);
//# sourceMappingURL=Community.js.map