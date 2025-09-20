"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
class AIService {
    static async classifyItem(description, images) {
        const keywords = description.toLowerCase().split(" ");
        const categories = ["electronics", "clothing", "books", "furniture", "kitchen", "sports"];
        const tags = categories.filter((category) => keywords.some((keyword) => keyword.includes(category.slice(0, 4))));
        const sustainabilityTags = [];
        if (keywords.includes("eco") || keywords.includes("sustainable")) {
            sustainabilityTags.push("eco-friendly");
        }
        if (keywords.includes("organic")) {
            sustainabilityTags.push("organic");
        }
        if (keywords.includes("recycled")) {
            sustainabilityTags.push("recycled");
        }
        return [...tags, ...sustainabilityTags];
    }
    static async calculateSustainabilityImpact(itemData) {
        const baseCO2 = itemData.estimatedValue * 0.5;
        const baseWaste = itemData.estimatedValue * 0.1;
        const categoryMultipliers = {
            electronics: 2.5,
            furniture: 3.0,
            clothing: 1.5,
            books: 0.8,
            kitchen: 1.8,
            sports: 1.2,
        };
        const multiplier = categoryMultipliers[itemData.category] || 1.0;
        return {
            co2_saved: Math.round(baseCO2 * multiplier * 100) / 100,
            waste_diverted: Math.round(baseWaste * multiplier * 100) / 100,
            category_impact: `High impact for ${itemData.category} category`,
        };
    }
    static async calculateCompatibilityScore(proposerItems, receiverItems) {
        const baseScore = Math.random() * 40 + 60;
        return Math.round(baseScore);
    }
    static async calculateSwapImpact(proposerItems, receiverItems) {
        const totalItems = proposerItems.length + receiverItems.length;
        return {
            co2_saved: Math.round(totalItems * 2.5 * 100) / 100,
            waste_diverted: Math.round(totalItems * 0.8 * 100) / 100,
        };
    }
    static async generateSwapRecommendations(userId) {
        return [
            {
                item_id: "mock-item-1",
                compatibility_score: 95,
                reason: "Perfect match for your kitchen category preferences",
            },
            {
                item_id: "mock-item-2",
                compatibility_score: 87,
                reason: "Similar condition and value range",
            },
        ];
    }
}
exports.AIService = AIService;
//# sourceMappingURL=AIService.js.map