import axios from "axios";

const API_BASE_URL = process.env.VITE_FIREWALL_API;

// User sign up
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);

    // Store token in localStorage after successful signup
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// User login
export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );

    // Store token in localStorage after successful login
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error;
  }
};
