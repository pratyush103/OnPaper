import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

  const login = (token, user) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload || typeof payload !== 'object') {
        throw new Error('Invalid token');
      }
      if (!user || typeof user !== 'string') {
        throw new Error('Invalid user object: ' + user);
      }
      localStorage.setItem("token", token);
      setAuthToken(token);
      localStorage.setItem("user", user);
      setUserInfo(JSON.parse(user));
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    localStorage.removeItem("user");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, userInfo, login, logout, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };