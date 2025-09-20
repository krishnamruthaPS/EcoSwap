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
exports.SwapProposal = exports.Item = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ItemSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    category: {
        type: String,
        required: true,
        enum: ["electronics", "clothing", "books", "home", "sports", "toys", "other"],
    },
    subcategory: String,
    condition: {
        type: String,
        required: true,
        enum: ["new", "like-new", "good", "fair", "poor"],
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        },
    },
    estimated_value: {
        type: Number,
        required: true,
        min: 0,
    },
    swap_preferences: [String],
    availability_status: {
        type: String,
        enum: ["available", "pending", "swapped", "unavailable"],
        default: "available",
    },
    ai_tags: [String],
    sustainability_impact: {
        co2_saved: { type: Number, default: 0 },
        waste_diverted: { type: Number, default: 0 },
        category_impact: String,
    },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
const SwapProposalSchema = new mongoose_1.Schema({
    proposer_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    proposer_items: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Item",
            required: true,
        },
    ],
    receiver_items: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Item",
            required: true,
        },
    ],
    status: {
        type: String,
        enum: ["pending", "accepted", "declined", "completed", "cancelled"],
        default: "pending",
    },
    message: {
        type: String,
        maxlength: 500,
    },
    compatibility_score: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
    },
    estimated_impact: {
        co2_saved: { type: Number, default: 0 },
        waste_diverted: { type: Number, default: 0 },
    },
    completed_at: Date,
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
ItemSchema.index({ user_id: 1, availability_status: 1 });
ItemSchema.index({ category: 1, availability_status: 1 });
ItemSchema.index({ "location.coordinates": "2dsphere" });
ItemSchema.index({ created_at: -1 });
SwapProposalSchema.index({ proposer_id: 1, status: 1 });
SwapProposalSchema.index({ receiver_id: 1, status: 1 });
SwapProposalSchema.index({ created_at: -1 });
exports.Item = mongoose_1.default.model("Item", ItemSchema);
exports.SwapProposal = mongoose_1.default.model("SwapProposal", SwapProposalSchema);
//# sourceMappingURL=Item.js.map