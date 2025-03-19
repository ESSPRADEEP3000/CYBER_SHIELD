import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import SDKSetupPage from "./pages/SDKSetupPage";
import { AuthProvider } from "./context/AuthContext";
import IndividualDashboard from "./pages/IndividualDashboard";
import AppDetails from "./pages/AppDetails";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-900">
          <Navbar />
          <div className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sdk-setup" element={<SDKSetupPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/app-details/:appId" element={<AppDetails />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/indash" element={<IndividualDashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;