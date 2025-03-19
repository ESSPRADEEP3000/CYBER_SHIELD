import mongoose from "mongoose";
import TrafficLog from "../models/TrafficLog.js";

// ✅ Log a traffic event from an external web app
export const logTrafficEvent = async (io, req, res) => {
  try {
    const { appId } = req.params;
    const { url, method, statusCode, userAgent } = req.body;

    // ✅ Extract client IP properly
    const ip =
      req.body.ip;

    // ✅ Validate required fields
    if (!appId || !url || !method || !statusCode || !userAgent || !ip) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // ✅ Ensure `appId` is valid
    if (!mongoose.Types.ObjectId.isValid(appId)) {
      return res.status(400).json({ error: "Invalid App ID format." });
    }

    // ✅ Create and save log entry
    const newLog = new TrafficLog({
      appId,
      ip,
      url,
      method,
      statusCode,
      userAgent,
      timestamp: new Date(),
      source: "external",
    });

    await newLog.save();

    // ✅ Emit WebSocket event safely
    try {
      io.of('/traffic').to(appId).emit(`traffic-update-${appId}`, newLog);
      console.log(`📡 Emitted traffic update for ${appId}:`, newLog);
    } catch (wsError) {
      console.error("❌ WebSocket Emission Failed:", wsError);
    }

    res.status(201).json({ message: "Traffic logged successfully" });
  } catch (error) {
    console.error("❌ Error logging traffic:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Fetch traffic logs for a specific appId with pagination
export const getTrafficLogs = async (req, res) => {
  try {
    const { appId } = req.params;
    let { page = 1, limit = 100 } = req.query;

    // ✅ Validate appId format
    if (!mongoose.Types.ObjectId.isValid(appId)) {
      return res.status(400).json({ error: "Invalid App ID format." });
    }

    // ✅ Ensure valid pagination values
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(Math.max(1, parseInt(limit, 10) || 100), 500);

    // ✅ Query: Fetch only external web app logs
    const query = { appId, source: "external" };

    // ✅ Fetch logs efficiently
    const [logs, totalLogs] = await Promise.all([
      TrafficLog.find(query)
        .sort({ timestamp: -1 }) // Latest logs first
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      TrafficLog.countDocuments(query),
    ]);

    res.json({
      success: true,
      appId,
      totalLogs,
      currentPage: pageNum,
      totalPages: Math.ceil(totalLogs / limitNum),
      logs,
    });
  } catch (err) {
    console.error("❌ Error fetching logs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const connectWebSocket = (appId, onTrafficUpdate) => {
  if (!appId) {
    console.error("Cannot connect WebSocket: Missing appId");
    return;
  }

  // Use the correct URL format and namespace
  const socket = io(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/traffic`, {
    query: { appId },
    transports: ['websocket', 'polling'], // Try both transport methods
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // Debug connection status
  socket.on('connect', () => {
    console.log(`✅ WebSocket connected for app: ${appId}`);
    socket.emit('subscribe', { appId }); // Explicitly subscribe to app events
  });

  socket.on('connect_error', (error) => {
    console.error(`❌ WebSocket connection error for app ${appId}:`, error);
  });

  // Listen for the specific event for this app
  socket.on(`traffic-update-${appId}`, (data) => {
    console.log(`📡 Received traffic update for app ${appId}:`, data);
    if (typeof onTrafficUpdate === 'function') {
      onTrafficUpdate(data);
    }
  });

  // Global traffic events (as fallback)
  socket.on('traffic-update', (data) => {
    console.log(`📡 Received global traffic update:`, data);
    if (data.appId === appId && typeof onTrafficUpdate === 'function') {
      onTrafficUpdate(data);
    }
  });

  return () => {
    socket.disconnect();
  };
};