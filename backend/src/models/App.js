import mongoose from "mongoose";

const appSchema = new mongoose.Schema(
  {
    appName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    apiKey: { type: String, required: true },
    blockedIPs: { type: [String], default: [] }, // Add this field
  },
  { timestamps: true }
);

const App = mongoose.model("App", appSchema);
export default App;
