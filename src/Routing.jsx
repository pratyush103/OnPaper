import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/trade/Dashboard";
import PrivateRoute from "./components/auth/PrivateRoute";


function Routing() {
    return (      
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        </Routes>
    );
}

export default Routing;
  