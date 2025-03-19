import mongoose from "mongoose";

const trafficLogSchema = new mongoose.Schema({
  appId: { type: String, required: true },
  ip: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true },
  statusCode: { type: Number, required: true },
  userAgent: { type: String },
  source: {
    type: String,
    enum: ["sdk", "dashboard", "external"],
    default: "sdk",
  }, // ✅ Added "external"
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("TrafficLog", trafficLogSchema);
