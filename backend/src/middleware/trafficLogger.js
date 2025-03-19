// firewall-backend/src/middleware/trafficLogger.js
import TrafficLog from "../models/TrafficLog.js";
import { findAppByApiKey } from "../db/appStore.js";

export default (io) => async (req, res, next) => {
  res.on("finish", async () => {
    try {
      const appIdFromHeader = req.headers["x-app-id"];
      const apiKey = req.headers["x-api-key"];
      let appId = appIdFromHeader || req.query.appId;
      const ip = req.body.ip 
      
        
      const source = "external"; // Always mark as external if it's not SDK or dashboard

      console.log(
        `🔍 Incoming Request: ${req.method} ${req.originalUrl} (AppID: ${
          appId || "N/A"
        })`
      );
      console.log(ip)

      // 🚫 Ignore SDK & Dashboard Traffic
      if (
        req.headers["x-sdk-request"] ||
        req.headers["x-source"] === "dashboard"
      ) {
        return console.log("🛑 Ignoring SDK or Dashboard traffic.");
      }

      // 🔥 Resolve `appId` using API Key if missing
      if (!appId && !apiKey) {
        console.warn("⚠️ No appId or apiKey provided for traffic logging");
        return;
      }

      if (!appId && apiKey) {
        try {
          const app = await findAppByApiKey(apiKey);
          if (app) {
            appId = app._id.toString();
            console.log(`✅ Resolved appId: ${appId}`);
          } else {
            console.warn("⚠️ No app found for provided API key");
            return;
          }
        } catch (error) {
          console.error("❌ Error looking up app by API key:", error);
          return;
        }
      }

      // 🚨 Ensure `appId` is valid before logging
      if (!appId) {
        console.warn(`⚠️ No valid appId found. Skipping traffic log.`);
        return;
      }

      const isBlocked = await validateIP(appId, ip);
      if (isBlocked) {
        console.log(`🛑 IP ${ip} is blocked. Skipping traffic logging.`);
        return;
      }

      // 🚀 Log only External Web App Traffic
      const logEntry = new TrafficLog({
        ip,
        url: req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        userAgent: req.get("User-Agent"),
        appId,
        timestamp: new Date(),
        source,
      });

      await logEntry.save();

      // ✅ Emit WebSocket updates using the `/traffic` namespace
      try {
        io.of("/traffic").to(appId).emit(`traffic-update-${appId}`, logEntry);
        console.log(`📡 WebSocket Emitted: traffic-update-${appId}`);
      } catch (wsError) {
        console.error("❌ WebSocket Emission Failed:", wsError);
      }
    } catch (error) {
      console.error("❌ Error logging traffic:", error);
    }
  });

  next();
};