import { findAppById } from "../db/appStore.js";

export const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"]; // API key should be passed in headers as 'x-api-key'

  if (!apiKey) {
    return res.status(400).json({ message: "API key is missing" });
  }

  try {
    const { appId } = req.params; // Extract appId from route parameters

    // Fetch the app based on appId and check if API key matches
    const app = await findAppById(appId);

    if (!app) {
      return res.status(404).json({ message: "App not found" });
    }

    if (app.apiKey !== apiKey) {
      return res.status(403).json({ message: "Invalid API key" });
    }

    // API key is valid, proceed to next middleware/route handler
    next();
  } catch (error) {
    res.status(500).json({ message: "Error validating API key", error });
  }
};
