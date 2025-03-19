import { storeApp, findAppsByUserId, findAppById } from "../db/appStore.js";
import {
  storeIPBlockRule,
  getBlockedIPsForApp,
  removeIPBlockRule,
} from "../db/ruleStore.js";

// Create app
export const createApp = async (appName, userId, apiKey) => {
  const appData = { appName, user: userId, apiKey };
  return await storeApp(appData);
};

// Get all apps for a user
export const getAllAppsForUser = async (userId) => {
  return await findAppsByUserId(userId);
};

// Get blocked IPs for an app
export const getBlockedIPs = async (appId) => {
  return await getBlockedIPsForApp(appId);
};

// Block an IP for an app
export const blockIPForApp = async (appId, ip) => {
  return await storeIPBlockRule(appId, ip);
};

// Unblock an IP for an app
export const unblockIPForApp = async (appId, ip) => {
  return await removeIPBlockRule(appId, ip);
};

// Validates if the given IP is blocked for the app with the given appId.
export const validateIP = async (appId, ip) => {
  try {
    // Fetch app details by appId
    const app = await findAppById(appId);
    console.log(app);
    if (!app) {
      throw new Error("App not found");
    }

    // Check if the IP is in the blocked IPs list
    return app.blockedIPs.includes(ip);
  } catch (error) {
    throw new Error("Error validating IP: " + error.message);
  }
};
