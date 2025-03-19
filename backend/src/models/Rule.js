import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
  {
    appId: { type: mongoose.Schema.Types.ObjectId, ref: "App", required: true },
    ip: { type: String, required: true },
    action: { type: String, enum: ["block", "unblock"], required: true },
  },
  { timestamps: true }
);

// Add a unique composite index for appId and ip
ruleSchema.index({ appId: 1, ip: 1, action: 1 }, { unique: true });

const Rule = mongoose.model("Rule", ruleSchema);
export default Rule;
