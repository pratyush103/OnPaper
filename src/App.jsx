import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/trade/Dashboard";
import Profile from "./components/user/Profile";
import PrivateRoute from "./components/auth/PrivateRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import TradingViewNewsWidget from "./components/trade/TradingViewNewsWidget";
import TradingViewWidget from "./components/trade/TradingViewWidget";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/update-profile" element={<PrivateRoute component={UpdateProfile} />} />
            <Route path="/trade/news" element={<TradingViewNewsWidget />} />
            <Route path="/trade/Tradeview" element={<TradingViewWidget />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;