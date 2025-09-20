export interface BusinessPartner {
    id: string;
    business_name: string;
    business_type: string;
    description: string;
    logo_url?: string;
    website?: string;
    contact_email: string;
    contact_phone?: string;
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        coordinates: [number, number];
    };
    sustainability_programs: string[];
    offers: BusinessOffer[];
    verification_status: "pending" | "verified" | "rejected";
    rating: number;
    reviews_count: number;
    created_at: Date;
    updated_at: Date;
}
export interface BusinessOffer {
    id: string;
    business_id: string;
    title: string;
    description: string;
    offer_type: "discount" | "reward" | "service" | "product";
    value: string;
    terms: string;
    valid_until?: Date;
    usage_limit?: number;
    used_count: number;
    active: boolean;
}
//# sourceMappingURL=Business.d.ts.map