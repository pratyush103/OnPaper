import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Profile from './components/user/Profile';
import Register from "./components/auth/Register";
import Dashboard from "./components/trade/Dashboard";
import TradePage from "./components/trade/TradePage";
import PrivateRoute from "./components/auth/PrivateRoute";
import UpdateProfile from './components/user/UpdateProfile';
import TradingViewWidget from "./components/trade/TradingViewWidget";
import TradingViewNewsWidget from "./components/trade/TradingViewNewsWidget";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/update-profile" element={<PrivateRoute component={UpdateProfile} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/trade/news" element={<TradingViewNewsWidget />} />
            <Route path="/trade/Tradeview" element={<TradingViewWidget />} />
            <Route path="/trade/TradePage" element={<PrivateRoute component={TradePage}/>}  />
        </Routes>
    );
}

export default Routing;