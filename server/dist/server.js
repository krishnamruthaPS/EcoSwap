"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const database_1 = require("./config/database");
const NotificationService_1 = require("./services/NotificationService");
const auth_1 = __importDefault(require("./routes/auth"));
const items_1 = __importDefault(require("./routes/items"));
const swaps_1 = __importDefault(require("./routes/swaps"));
const community_1 = __importDefault(require("./routes/community"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/api/auth", auth_1.default);
app.use("/api/items", items_1.default);
app.use("/api/swaps", swaps_1.default);
app.use("/api/community", community_1.default);
app.use("/api/analytics", analytics_1.default);
app.use("/api/notifications", notifications_1.default);
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join_user_room", (userId) => {
        socket.join(`user_${userId}`);
        console.log(`User ${userId} joined their notification room`);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
NotificationService_1.NotificationService.setSocketIO(io);
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
    });
});
app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await (0, database_1.connectDB)();
        console.log("Database connected successfully");
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=server.js.map