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
exports.Swap = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const SwapSchema = new mongoose_1.Schema({
    requesterId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    requestedItemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    offeredItemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    message: {
        type: String,
        maxlength: 500,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined", "completed", "cancelled"],
        default: "pending",
    },
    compatibilityScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    estimatedImpact: {
        co2_saved: { type: Number, default: 0 },
        waste_diverted: { type: Number, default: 0 },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    acceptedAt: Date,
    completedAt: Date,
});
SwapSchema.index({ requesterId: 1, status: 1 });
SwapSchema.index({ ownerId: 1, status: 1 });
SwapSchema.index({ createdAt: -1 });
exports.Swap = mongoose_1.default.model("Swap", SwapSchema);
//# sourceMappingURL=Swap.js.map