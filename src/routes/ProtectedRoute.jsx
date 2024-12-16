import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!Cookies.get("_token"));
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute; 