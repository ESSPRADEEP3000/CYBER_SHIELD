import express from "express";
import {
  createAppController,
  getAllAppsController,
  getBlockedIPsController,
  blockIPController,
  unblockIPController,
  validateIPController,
} from "../controllers/appController.js";
import {
  getTrafficLogs,
  logTrafficEvent,
} from "../controllers/trafficController.js"; // ✅ Import traffic controllers
import { verifyJWT } from "../middleware/authMiddleware.js";
import { validateApiKey } from "../middleware/validateApiKey.js";

const appRoutes = (io) => {
  const router = express.Router();

  // ✅ Dashboard Routes (Requires JWT Authentication)
  router.post("/apps", verifyJWT, createAppController);
  router.get("/apps", verifyJWT, getAllAppsController);
  router.get("/apps/:appId/blocked-ips", verifyJWT, getBlockedIPsController);
  router.post("/apps/:appId/block-ip", verifyJWT, blockIPController);
  router.post("/apps/:appId/unblock-ip", verifyJWT, unblockIPController);

  // ✅ Fetch traffic logs (For Dashboard)
  router.get("/apps/:appId/traffic-log", verifyJWT, getTrafficLogs);

  // ✅ Log traffic event (For External Web Apps)
  router.post("/apps/:appId/traffic-log", validateApiKey, (req, res, next) =>
    logTrafficEvent(io, req, res, next)
  );

  // ✅ External Web App Route (API Key Authentication)
  router.post("/apps/:appId/validate-ip", validateApiKey, validateIPController);

  return router;
};

export default appRoutes;
