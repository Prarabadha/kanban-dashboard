import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    // Check if user is logged in by verifying localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    
    // Only allow access if both isLoggedIn and user data exist
    if (loggedInStatus && userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // While checking authentication status, show nothing (prevents flash)
  if (isLoggedIn === null) {
    return null;
  }

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
