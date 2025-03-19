import { io } from "socket.io-client";
import axios from 'axios';

// Store socket connections by appId
const socketConnections = {};
const FIREWALL_API_URL = "http://localhost:4000"; // Update with actual backend URL
const sockets = {}; // Store WebSocket connections per app

export const connectWebSocket = (appId, onTrafficUpdate) => {
    if (!appId) {
        console.error("❌ Cannot connect WebSocket: Missing appId");
        return;
    }

    // Check if socket already exists for this appId
    if (socketConnections[appId]) {
        console.log(`✅ WebSocket already connected for ${appId}`);
        return;
    }

    console.log(`🔌 Connecting WebSocket for ${appId}...`);

    // Create a new socket connection
    const socket = io(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/traffic`, {
        query: { appId },
        transports: ['websocket', 'polling'], // Try both transport methods
    });

    socket.on('connect', () => {
        console.log(`✅ WebSocket connected for ${appId}`);
        socket.emit('subscribe', { appId }); // Explicitly subscribe to the app's room
    });

    // Listen for traffic updates for this specific app
    socket.on(`traffic-update-${appId}`, (data) => {
        console.log(`📡 Received traffic update for ${appId}:`, data);
        if (typeof onTrafficUpdate === 'function') {
            onTrafficUpdate(data);
        }
    });

    socket.on('connect_error', (error) => {
        console.error(`❌ WebSocket connection error for ${appId}:`, error);
    });

    socket.on('disconnect', (reason) => {
        console.log(`❌ WebSocket disconnected for ${appId}: ${reason}`);
    });

    // Store the socket connection
    socketConnections[appId] = socket;
};

export const disconnectWebSocket = (appId) => {
    if (sockets[appId]) {
        sockets[appId].off(`traffic-update-${appId}`);
        sockets[appId].emit("unsubscribe", { appId });
        sockets[appId].disconnect();
        delete sockets[appId];
        console.log(`🛑 WebSocket disconnected for ${appId}`);
    }
};
const handleTrafficUpdate = (newLog) => {
    if (!newLog?.url) {
        console.warn("⚠️ Missing URL in traffic update", newLog);
        return;
    }
    setLogs((prevLogs) => [newLog, ...prevLogs]); // Prepend new log to the logs array
};

export const fetchTrafficLogs = async (appId, page = 1, limit = 100) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("JWT token not found!");

        const response = await fetch(
            `${FIREWALL_API_URL}/api/apps/${appId}/traffic-log?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-dashboard-request": "true",
                },
            }
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching traffic logs:", error);
        return [];
    }
};

