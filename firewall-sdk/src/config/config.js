import { connectWebSocket } from "../api/firewallApi"; 

let config = {
  FIREWALL_API_URL: "http://localhost:4000", // Default API URL
  API_KEY: "",
  APP_ID: "",
  REALTIME_MONITORING: false, // Default to false
  CUSTOM_HEADERS: {}
};

export const setConfig = (newConfig) => {
  config = { ...config, ...newConfig };

  if (config.REALTIME_MONITORING && config.APP_ID) {
    connectWebSocket(config.APP_ID, (data) => {
      console.log("🚀 Real-time traffic update:", data);
    });
  }
};

export const getConfig = () => config;