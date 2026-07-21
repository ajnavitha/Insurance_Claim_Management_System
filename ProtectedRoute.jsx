import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProtectedRoute({ children, requireRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
 if (
  requireRole &&
  user.role?.toLowerCase() !== requireRole.toLowerCase()
) {
  return <Navigate to="/" replace />;
}

  return children;
}
