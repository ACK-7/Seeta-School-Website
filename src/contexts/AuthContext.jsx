import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      console.log("Stored user from localStorage:", storedUser);
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem("authUser"); // Clean up invalid data
    }
    setAuthLoading(false);
  }, []);

  const login = (userObj) => {
    console.log("Login called with:", userObj);
    
    // Validate user object
    if (!userObj || typeof userObj !== 'object') {
      console.error("Invalid user object provided to login");
      return;
    }

    setUser(userObj);
    setIsAuthenticated(true);
    localStorage.setItem("authUser", JSON.stringify(userObj));
    console.log("User logged in successfully:", userObj);
  };

  const logout = () => {
    console.log("Logout called");
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authUser");
    console.log("User logged out successfully");
  };

  // Debug log current user state
  useEffect(() => {
    console.log("Current user state:", user);
    console.log("Is authenticated:", isAuthenticated);
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isAuthenticated, 
        authLoading, 
        login, 
        logout, 
        setUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};