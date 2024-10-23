import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import React, { useContext,useRef } from "react";
import Routing from "./Routing";
import { AuthProvider } from "./components/auth/AuthContext";
import Navbar from "./components/Navbar";
import { ToastProvider } from './components/app-status/ToastContext';
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { TradeProvider, TradeContext } from "./components/trade/TradeProvider";
import { AuthContext } from "./components/auth/AuthContext";
import { WebSocketManager } from "./components/trade/WebSocketManager";
// App.jsx
function App() {
  
  // const authContext = useContext(AuthContext);
  useEffect(() => {
    // const [theme, setTheme] = useState("light");
    
    
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
    <ToastProvider>
      <script src="https://cdn.jsdelivr.net/npm/typesense-instantsearch-adapter@2/dist/typesense-instantsearch-adapter.min.js"></script>
        <AuthProvider>
          <TradeProvider>
            <WebSocketManager>
            <Router>
              <Navbar />
              <ErrorBoundary>
                <Routing />
              </ErrorBoundary>
            </Router>
            </WebSocketManager>
          </TradeProvider>  
        </AuthProvider>
    </ToastProvider>
  );
}

export default App ;
