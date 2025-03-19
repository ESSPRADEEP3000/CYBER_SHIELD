// Login.jsx
import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // Import useAuth

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Destructure login from useAuth

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      authLogin(data.token); // Use authLogin to set the token
      navigate("/dashboard");
      location.reload();
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded mb-4 bg-gray-800 text-gray-200 placeholder-gray-500"
          aria-label="Password"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;