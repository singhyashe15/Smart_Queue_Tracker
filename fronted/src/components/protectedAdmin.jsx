import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const Storeduser = localStorage.getItem('user');
  const user = Storeduser ? JSON.parse(Storeduser) : null;

  if (user === null || user.role === 'user') {
    console.log(user)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
