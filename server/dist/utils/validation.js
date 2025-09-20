"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerSchema = exports.CommunityPostSchema = exports.SwapProposalSchema = exports.ItemSchema = void 0;
const zod_1 = require("zod");
exports.ItemSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().min(10).max(2000),
    category: zod_1.z.string().min(1),
    subcategory: zod_1.z.string().optional(),
    condition: zod_1.z.enum(["new", "like-new", "good", "fair", "poor"]),
    images: zod_1.z.array(zod_1.z.string().url()).max(10),
    location: zod_1.z.object({
        city: zod_1.z.string(),
        state: zod_1.z.string(),
        country: zod_1.z.string(),
        coordinates: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]).optional(),
    }),
    estimated_value: zod_1.z.number().positive(),
    swap_preferences: zod_1.z.array(zod_1.z.string()),
});
exports.SwapProposalSchema = zod_1.z.object({
    proposer_id: zod_1.z.string().uuid(),
    receiver_id: zod_1.z.string().uuid(),
    proposer_items: zod_1.z.array(zod_1.z.string().uuid()).min(1),
    receiver_items: zod_1.z.array(zod_1.z.string().uuid()).min(1),
    message: zod_1.z.string().max(500).optional(),
});
exports.CommunityPostSchema = zod_1.z.object({
    content: zod_1.z.string().min(1).max(2000),
    images: zod_1.z.array(zod_1.z.string().url()).max(5).optional(),
    post_type: zod_1.z.enum(["general", "swap_story", "tip", "question", "achievement"]).optional(),
    tags: zod_1.z.array(zod_1.z.string()).max(10).optional(),
});
exports.BusinessPartnerSchema = zod_1.z.object({
    business_name: zod_1.z.string().min(1).max(200),
    business_type: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().max(2000).optional(),
    website: zod_1.z.string().url().optional(),
    contact_email: zod_1.z.string().email(),
    contact_phone: zod_1.z.string().optional(),
    location: zod_1.z.object({
        address: zod_1.z.string(),
        city: zod_1.z.string(),
        state: zod_1.z.string(),
        country: zod_1.z.string(),
        coordinates: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]),
    }),
    sustainability_programs: zod_1.z.array(zod_1.z.string()),
});
//# sourceMappingURL=validation.js.map