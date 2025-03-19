import { io } from "socket.io-client";
import { getConfig } from "../config/config";
import axios from "axios";
import { getUserIP } from "../utils/ipUtils";

let socket = null;
let retryAttempts = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;

export const connectWebSocket = (appId, onTrafficUpdate) => {
  const { FIREWALL_API_URL, API_KEY } = getConfig();

  if (!appId || !FIREWALL_API_URL || !API_KEY) {
    throw new Error("Missing required parameters for WebSocket connection");
  }
console.log(FIREWALL_API_URL)
  if (socket?.connected) {
    console.warn("WebSocket already connected");
    return;
  }

  const connect = () => {
    if (socket) {
      socket.close();
      socket = null;
    }

    socket = io(`${FIREWALL_API_URL}/traffic`, {
      query: { apiKey: API_KEY, appId },
      reconnectionAttempts: MAX_RETRIES,
      reconnectionDelay: RETRY_DELAY,
      timeout: 10000,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log(`Connected to WebSocket for App: ${appId}`);
      retryAttempts = 0;
      socket.emit("subscribe", { appId });
    });

    socket.on("disconnect", (reason) => {
      console.warn(`WebSocket Disconnected (${reason}) for App: ${appId}`);
      if (reason === "io server disconnect") {
        connect(); // Reconnect if server disconnected
      }
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket Connection Error:", error);
      if (retryAttempts < MAX_RETRIES) {
        retryAttempts++;
        setTimeout(connect, RETRY_DELAY * Math.pow(2, retryAttempts));
      }
    });

    socket.on(`traffic-update-${appId}`, (data) => {
      if (typeof onTrafficUpdate === "function") {
        try {
          onTrafficUpdate(data);
        } catch (error) {
          console.error("Error in traffic update callback:", error);
        }
      }
    });
  };

  connect();
  return () => disconnectWebSocket();
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.off(); // ✅ Properly clean up listeners
    socket.disconnect();
    socket = null;
    console.log("🔌 WebSocket Disconnected");
  }
};

export const validateIP = async (ip) => {
  const { FIREWALL_API_URL, APP_ID, API_KEY } = getConfig();

  if (!ip) {
    console.error("❌ IP address is required for validation.");
    return { error: "IP address is required" };
  }

  try {
    const response = await fetch(
      `${FIREWALL_API_URL}/api/apps/${APP_ID}/validate-ip`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "x-app-id": APP_ID,
          "x-sdk-request": "true",
        },
        body: JSON.stringify({ ip }),
      }
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Error in validateIP:", error);
    return { error: "Failed to validate IP" };
  }
};

export const logNavigationEvent = async () => {
  const ip = await getUserIP();
  const { FIREWALL_API_URL, APP_ID, API_KEY } = getConfig();

  try {
    const fullUrl = window.location.href;

    await fetch(`${FIREWALL_API_URL}/api/apps/${APP_ID}/traffic-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "x-app-id": APP_ID,
        "x-sdk-request": "true",
      },
      body: JSON.stringify({
        ip,
        url: fullUrl,
        method: "NAVIGATE",
        statusCode: 200,
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error("❌ Error logging navigation event:", error);
  }
};

export const logApiRequest = async (endpoint, method, statusCode) => {
  const { FIREWALL_API_URL, APP_ID, API_KEY } = getConfig();
  const ip = await getUserIP();
  try {
    await fetch(`${FIREWALL_API_URL}/api/apps/${APP_ID}/traffic-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "x-app-id": APP_ID,
        "x-sdk-request": "true",
      },
      body: JSON.stringify({
        ip,
        url: endpoint,
        method,
        statusCode,
        userAgent: navigator.userAgent,
      }),
    });
  } catch (error) {
    console.error("❌ Error logging API request:", error);
  }
};
// firewall-sdk/src/api/firewallApi.js

export const setupAxiosInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use((request) => {
    console.log("Request Interceptor:", request);
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response Interceptor:", response);
      logApiRequest(response.config.url, response.config.method.toUpperCase(), response.status);
      return response;
    },
    (error) => {
      if (error.response) {
        logApiRequest(error.config.url, error.config.method.toUpperCase(), error.response.status);
      }
      return Promise.reject(error);
    }
  );
};