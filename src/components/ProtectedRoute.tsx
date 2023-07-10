import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from '../contexts/pocketbase';

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element, ...rest }) => {
  return <Route {...rest} path={path} element={isLoggedIn() ? element : <Navigate to="/login" />} />;
};

export default ProtectedRoute;
