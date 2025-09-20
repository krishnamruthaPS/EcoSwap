import { z } from "zod";
export declare const ItemSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    subcategory: z.ZodOptional<z.ZodString>;
    condition: z.ZodEnum<{
        new: "new";
        "like-new": "like-new";
        good: "good";
        fair: "fair";
        poor: "poor";
    }>;
    images: z.ZodArray<z.ZodString>;
    location: z.ZodObject<{
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodOptional<z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>>;
    }, z.core.$strip>;
    estimated_value: z.ZodNumber;
    swap_preferences: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const SwapProposalSchema: z.ZodObject<{
    proposer_id: z.ZodString;
    receiver_id: z.ZodString;
    proposer_items: z.ZodArray<z.ZodString>;
    receiver_items: z.ZodArray<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const CommunityPostSchema: z.ZodObject<{
    content: z.ZodString;
    images: z.ZodOptional<z.ZodArray<z.ZodString>>;
    post_type: z.ZodOptional<z.ZodEnum<{
        general: "general";
        swap_story: "swap_story";
        tip: "tip";
        question: "question";
        achievement: "achievement";
    }>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const BusinessPartnerSchema: z.ZodObject<{
    business_name: z.ZodString;
    business_type: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    contact_email: z.ZodString;
    contact_phone: z.ZodOptional<z.ZodString>;
    location: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
    }, z.core.$strip>;
    sustainability_programs: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map