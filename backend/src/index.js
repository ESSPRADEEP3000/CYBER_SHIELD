import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import appRoutes from "./routes/appRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import trafficLogger from "./middleware/trafficLogger.js";
import ipAnalysisRoutes from "./routes/ipAnalysisRoutes.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Create HTTP Server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGINS.split(",")
        : "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingTimeout: 60000,
  connectTimeout: 30000,
});

io.on("connect_error", (error) => {
  console.error("WebSocket connection error:", error);
});

io.on("connect_timeout", (timeout) => {
  console.error("WebSocket connection timeout:", timeout);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // Attach WebSocket to traffic logging middleware
  trafficLogger(io)(req, res, next);
});

// Routes
app.use("/api", appRoutes(io));
app.use("/api", authRoutes);
app.use("/api/ip",ipAnalysisRoutes);

// WebSocket Connection for Real-time Monitoring
const trafficNamespace = io.of("/traffic");

trafficNamespace.on("connection", (socket) => {
  console.log("✅ Client connected to /traffic namespace");

  socket.on("subscribe", ({ appId }) => {
    if (appId) {
      socket.join(appId);
      console.log(`🔗 Client subscribed to app: ${appId}`);
    }
  });

  socket.on("disconnect", () => console.log("❌ Client disconnected"));
});

// Database Connection with Error Handling
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Start Server
server.listen(port, () => console.log(`🚀 Server running on port ${port}`));
