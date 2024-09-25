import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import React, { useContext } from "react";
import Routing from "./Routing";
import { AuthProvider } from "./components/auth/AuthContext";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
// App.jsx
function App() {
  useEffect(() => {
    const updateTheme = () => {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = prefersDarkScheme ? "dark" : "light";
      document.documentElement.setAttribute("data-bs-theme", theme);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    updateTheme();
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Navbar />
          <Routing />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
