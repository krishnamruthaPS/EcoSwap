export declare class AIService {
    static classifyItem(description: string, images: string[]): Promise<string[]>;
    static calculateSustainabilityImpact(itemData: any): Promise<{
        co2_saved: number;
        waste_diverted: number;
        category_impact: string;
    }>;
    static calculateCompatibilityScore(proposerItems: string[], receiverItems: string[]): Promise<number>;
    static calculateSwapImpact(proposerItems: string[], receiverItems: string[]): Promise<{
        co2_saved: number;
        waste_diverted: number;
    }>;
    static generateSwapRecommendations(userId: string): Promise<any[]>;
}
//# sourceMappingURL=AIService.d.ts.map