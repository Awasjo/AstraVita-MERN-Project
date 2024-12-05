import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('user') !== null;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute; 