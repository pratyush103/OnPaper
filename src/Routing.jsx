import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/trade/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/update-profile" element={<PrivateRoute component={UpdateProfile} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        </Routes>
    );
}

export default Routing;