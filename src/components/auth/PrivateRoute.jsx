// PrivateRoute.jsx
import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authToken, userInfo } = useContext(AuthContext);

  return authToken ? (
    <Component {...rest} userInfo={userInfo} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
