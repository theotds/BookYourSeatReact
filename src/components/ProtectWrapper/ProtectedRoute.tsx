import React from 'react';
import { Navigate } from 'react-router-dom';

// Define the props type
interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

// Function component receiving props as a single object
const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;

  // Check user role and redirect if not matching
  if (!user || user.role !== props.role) {
    return <Navigate to="/login" replace />;
  }

  // Render children if role matches
  return <>{props.children}</>;
};

export default ProtectedRoute;
