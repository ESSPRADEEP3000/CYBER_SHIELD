// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create and export the AuthContext
export const AuthContext = createContext();

// Create and export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// The AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem("token");
        setIsLoggedIn(token ? true : false); // If token exists, set loggedIn state to true
    }, []);

    const login = (token) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", token); // Store token in localStorage
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
