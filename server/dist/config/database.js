"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb+srv://Krishnamrutha:EABWVdHHnNIx4CG9@ecoswap.ydqp0a1.mongodb.net/?retryWrites=true&w=majority&appName=Ecoswap";
        await mongoose_1.default.connect(mongoURI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ MongoDB connected successfully");
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
mongoose_1.default.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
process.on("SIGINT", async () => {
    await mongoose_1.default.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
});
//# sourceMappingURL=database.js.map