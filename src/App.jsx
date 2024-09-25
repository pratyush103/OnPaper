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
    document.documentElement.setAttribute("data-bs-theme", "dark");
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
