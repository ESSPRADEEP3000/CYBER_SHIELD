// Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // Import useAuth

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Destructure logout from useAuth

  const handleLogout = () => {
    logout(); // Use logout to clear the token
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-300">
        Log Out
      </button>
    </div>
  );
};

export default Logout;