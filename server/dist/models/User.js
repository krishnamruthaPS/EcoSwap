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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    full_name: {
        type: String,
        required: true,
        trim: true,
    },
    avatar_url: String,
    bio: {
        type: String,
        maxlength: 500,
    },
    location: String,
    sustainability_score: {
        type: Number,
        default: 0,
        min: 0,
    },
    items_swapped: {
        type: Number,
        default: 0,
        min: 0,
    },
    co2_saved: {
        type: Number,
        default: 0,
        min: 0,
    },
    preferences: {
        categories: [
            {
                type: String,
                enum: ["electronics", "clothing", "books", "home", "sports", "toys", "other"],
            },
        ],
        max_distance: {
            type: Number,
            default: 25,
            min: 1,
            max: 100,
        },
        notification_settings: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true },
            swap_matches: { type: Boolean, default: true },
            messages: { type: Boolean, default: true },
            community_updates: { type: Boolean, default: false },
        },
        privacy_settings: {
            show_location: { type: Boolean, default: true },
            show_swap_history: { type: Boolean, default: true },
            show_sustainability_score: { type: Boolean, default: true },
        },
    },
    stats: {
        total_swaps: { type: Number, default: 0 },
        successful_swaps: { type: Number, default: 0 },
        co2_saved: { type: Number, default: 0 },
        waste_diverted: { type: Number, default: 0 },
        community_impact_score: { type: Number, default: 0 },
        badges_earned: [String],
        current_streak: { type: Number, default: 0 },
        longest_streak: { type: Number, default: 0 },
    },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(12);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcryptjs_1.default.compare(candidatePassword, this.password);
};
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};
exports.User = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=User.js.map