import { z } from "zod"

export const ItemSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(2000),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  condition: z.enum(["new", "like-new", "good", "fair", "poor"]),
  images: z.array(z.string().url()).max(10),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
    coordinates: z.tuple([z.number(), z.number()]).optional(),
  }),
  estimated_value: z.number().positive(),
  swap_preferences: z.array(z.string()),
})

export const SwapProposalSchema = z.object({
  proposer_id: z.string().uuid(),
  receiver_id: z.string().uuid(),
  proposer_items: z.array(z.string().uuid()).min(1),
  receiver_items: z.array(z.string().uuid()).min(1),
  message: z.string().max(500).optional(),
})

export const CommunityPostSchema = z.object({
  content: z.string().min(1).max(2000),
  images: z.array(z.string().url()).max(5).optional(),
  post_type: z.enum(["general", "swap_story", "tip", "question", "achievement"]).optional(),
  tags: z.array(z.string()).max(10).optional(),
})

export const BusinessPartnerSchema = z.object({
  business_name: z.string().min(1).max(200),
  business_type: z.string().min(1).max(100),
  description: z.string().max(2000).optional(),
  website: z.string().url().optional(),
  contact_email: z.string().email(),
  contact_phone: z.string().optional(),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  sustainability_programs: z.array(z.string()),
})
