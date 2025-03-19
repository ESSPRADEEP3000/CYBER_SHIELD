import React, { useEffect, useState } from "react";
import { checkIP } from "../services/firewallService";
import { connectWebSocket, disconnectWebSocket, logNavigationEvent, logApiRequest } from "../api/firewallApi";
import { getConfig } from "../config/config";
import axios from "axios"; // Use the default Axios instance

const ProtectedPage = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { APP_ID, REALTIME_MONITORING } = getConfig();

    const validateIP = async () => {
      try {
        const blocked = await checkIP();
        setIsBlocked(blocked);
      } catch (error) {
        console.error("Error validating IP:", error);
        setIsBlocked(false);
      } finally {
        setLoading(false);
      }
    };

    validateIP();

    if (REALTIME_MONITORING && APP_ID) {
      const unsubscribe = connectWebSocket(APP_ID, (data) => {
        console.log("🚀 Real-time traffic update:", data);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  // Log navigation events using popstate and history method overrides
  useEffect(() => {
    const handlePopState = () => {
      logNavigationEvent(window.location.pathname);
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const handleStateChange = () => {
      logNavigationEvent(window.location.pathname);
    };

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleStateChange();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      handleStateChange();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Set up Axios interceptors
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((request) => {
      console.log("Request Interceptor:", request);
      return request;
    });

    const responseInterceptor = axios.interceptors.response.use(
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

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isBlocked) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>Your IP address has been blocked. Please contact support if you believe this is an error.</p>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default ProtectedPage;