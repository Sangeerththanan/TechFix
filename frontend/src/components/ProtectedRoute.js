import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './Service/tokenService'; 

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  // If token does not exist, redirect to login page
  if (!token) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
