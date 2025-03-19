import {
  createApp,
  getAllAppsForUser,
  getBlockedIPs,
  blockIPForApp,
  unblockIPForApp,
  validateIP,
} from "../services/appManager.js";
import { generateApiKey } from "../utils/apiKeyGenerator.js";
import { findRiskScore } from "./ipAnalysisController.js"; 
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
// Create a new app
export const createAppController = async (req, res) => {
  try {
    const { appName } = req.body;
    const userId = req.user.userId; // Get user ID from JWT
    const apiKey = generateApiKey(); // Generate API key for the app
    const newApp = await createApp(appName, userId, apiKey);
    res.status(201).json({ app: newApp, apiKey });
  } catch (error) {
    res.status(500).json({ message: "Failed to create app", error });
  }
};

// Get all apps for a specific user
export const getAllAppsController = async (req, res) => {
  try {
    const userId = req.user.userId; // Get user ID from JWT
    const apps = await getAllAppsForUser(userId);
    res.status(200).json({ apps });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch apps", error });
  }
};

// Get blocked IPs for a specific app
export const getBlockedIPsController = async (req, res) => {
  try {
    const { appId } = req.params;
    const blockedIPs = await getBlockedIPs(appId);
    res.status(200).json({ blockedIPs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blocked IPs", error });
  }
};

// Block an IP for a specific app
export const blockIPController = async (req, res) => {
  try {
    const { appId } = req.params; // Extract appId from route parameters
    const { ip } = req.body; // Extract IP from the request body

    // Validate input
    if (!appId || !ip) {
      return res.status(400).json({ message: "appId and IP are required." });
    }

    // Attempt to block the IP
    const rule = await blockIPForApp(appId, ip);

    res.status(201).json({
      message: `Successfully blocked IP: ${ip}`,
      rule,
    });
  } catch (error) {
    // Handle duplicate key error (MongoDB code 11000)
    if (error.code === 11000) {
      return res.status(409).json({
        message: `The IP address ${req.body.ip} is already blocked.`,
      });
    }

    // Generic error handling
    res
      .status(500)
      .json({ message: "Failed to block IP.", error: error.message });
  }
};

// Unblock an IP for a specific app
export const unblockIPController = async (req, res) => {
  try {
    const { appId } = req.params;
    const { ip } = req.body;
    await unblockIPForApp(appId, ip);
    res.status(200).json({ message: `Unblocked IP: ${ip}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to unblock IP", error });
  }
};



export const validateIPController = async (req, res) => {
  const { appId } = req.params; // Extract appId from route parameters
  const { ip } = req.body; // Extract IP address from request body

  try {
    // Check if the IP is already blocked
    const isBlocked = await validateIP(appId, ip);

    if (isBlocked) {
      return res.status(200).json({ blocked: true, message: "IP is already blocked." });
    }

    // If not blocked, find the risk score
    try {
      const riskScore = await findRiskScore(ip); // Use the findRiskScore function

      // Define a risk score threshold for blocking
      const riskScoreThreshold = 70; // Example threshold

      if (riskScore >= riskScoreThreshold) {
        // Block the IP if the risk score is above the threshold
        await blockIPForApp(appId, ip);
        return res.status(200).json({ blocked: true, message: "IP blocked due to high risk score." });
      }

      // If the risk score is below the threshold, do not block
      res.status(200).json({ blocked: false, message: "IP is not blocked.", riskScore });
    } catch (analysisError) {
      console.error("Error analyzing IP:", analysisError);
      return res.status(500).json({ message: "Error analyzing IP", error: analysisError.message });
    }
  } catch (error) {
    // Ensure that only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ message: "Error validating IP", error: error.message });
    } else {
      console.error("Error after headers sent:", error);
    }
  }
};