import mongoose from "mongoose";
import Rule from "../models/Rule.js"; // Ensure correct import
import App from "../models/App.js"; // Ensure App model is imported

// Store IP block rule into the database
export const storeIPBlockRule = async (appId, ip) => {
  try {
    // Save the new block rule
    const rule = new Rule({ appId, ip, action: "block" });
    await rule.save();

    // Update the App's blockedIPs array
    const app = await App.findById(appId);
    if (app && !app.blockedIPs.includes(ip)) {
      app.blockedIPs.push(ip);
      await app.save();
    }

    return rule;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error(`The IP ${ip} is already blocked for this app.`);
    }

    throw new Error(`Error blocking IP: ${error.message}`);
  }
};

// Get blocked IPs for an app
export const getBlockedIPsForApp = async (appId) => {
  // Retrieve blocked IPs from the Rule collection where the action is 'block'
  const rules = await Rule.find({ appId, action: "block" });
  return rules.map((rule) => rule.ip); // Return only the IPs
};

// Remove IP block rule
export const removeIPBlockRule = async (appId, ip) => {
  // Remove the block rule from Rule collection
  await Rule.deleteOne({ appId, ip, action: "block" });

  // Remove the IP from the App's blockedIPs array
  const app = await App.findById(appId);
  if (app) {
    app.blockedIPs = app.blockedIPs.filter((blockedIp) => blockedIp !== ip);
    await app.save(); // Save the updated app
  }
};

// Validates if the given IP is blocked for the app with the given appId.
export const validateIP = async (appId, ip) => {
  try {
    // Query to find if the IP is blocked for this app
    const blockedIP = await Rule.findOne({ appId, ip, action: "block" });

    // If a block rule is found, return that the IP is blocked
    if (blockedIP) {
      return { blocked: true };
    } else {
      return { blocked: false };
    }
  } catch (error) {
    throw new Error("Error validating IP: " + error.message);
  }
};
