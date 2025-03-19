import axios from "axios";

const API_BASE_URL = process.env.VITE_FIREWALL_API; // Backend API URL

// Helper to set Authorization headers
const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Add blockIP and unblockIP to the export list

export const blockIP = async (appId, ip, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/apps/${appId}/block-ip`,
      { ip },
      getAuthHeaders(token)
    );
    return response.data; // Return updated data after blocking IP
  } catch (error) {
    console.error("Error blocking IP:", error.response?.data || error.message);
    throw error;
  }
};

export const unblockIP = async (appId, ip, token) => {
  try {
    console.log(ip);
    const response = await axios.post(
      `${API_BASE_URL}/apps/${appId}/unblock-ip`,
      { ip },
      getAuthHeaders(token)
    );
    return response.data; // Return updated data after unblocking IP
  } catch (error) {
    console.error(
      "Error unblocking IP:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get user apps
export const getApps = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/apps`,
      getAuthHeaders(token)
    );
    return response.data.apps || []; // Ensure an empty array is returned if no apps
  } catch (error) {
    console.error(
      "Error fetching apps:",
      error.response?.data || error.message
    );
    throw error; // Rethrow for further handling
  }
};

// Add a new app
export const addApp = async (appName, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/apps`,
      { appName },
      getAuthHeaders(token)
    );
    return response.data; // Return newly created app data
  } catch (error) {
    console.error("Error adding app:", error.response?.data || error.message);
    throw error;
  }
};

// Get blocked IPs for an app
export const getBlockedIPs = async (appId, token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/apps/${appId}/blocked-ips`,
      getAuthHeaders(token)
    );
    return response.data.blockedIPs || []; // Ensure an empty array is returned if no blocked IPs
  } catch (error) {
    console.error(
      "Error fetching blocked IPs:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Generate a new API Key for an app
export const generateApiKey = async (appId, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/apps/${appId}/generate-key`,
      {},
      getAuthHeaders(token)
    );
    return response.data.apiKey; // Return generated API key
  } catch (error) {
    console.error(
      "Error generating API key:",
      error.response?.data || error.message
    );
    throw error;
  }
};

