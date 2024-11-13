import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("userInfo");

  return auth ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
