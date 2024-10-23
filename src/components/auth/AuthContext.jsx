import React, { createContext, useState, useEffect, useContext } from "react";
import { TradeContext } from "../trade/TradeProvider";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // useEffect(() => {
  //   if (authToken) {
  //     readUser(authToken);
  //   }
  // }, [authToken, readUser]);

  const updateToken = (idToken, refreshToken) => {
    const token = JSON.stringify({
      idToken: idToken,
      refreshToken: refreshToken,
    });
    localStorage.setItem("token", token);
    setAuthToken(JSON.parse(token));
  };
  const updateUser = (user) => {
    const userInformation = JSON.stringify(user);
    localStorage.setItem("user", userInformation);
    setUserInfo(JSON.parse(userInformation));
  };

  const login = (token, user) => {
    try {
      localStorage.setItem("token", JSON.stringify(token));
      setAuthToken(token);
      localStorage.setItem("user", user);
      setUserInfo(JSON.parse(user));
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    localStorage.removeItem("user");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, userInfo, login, logout, updateToken, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
