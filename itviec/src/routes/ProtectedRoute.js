import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = () => {
  if (user.isAuthenticated === true) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
