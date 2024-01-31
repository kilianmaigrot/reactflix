import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRoutesProps {
  isAuthenticated: boolean
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ isAuthenticated }) => (isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />);

export default PrivateRoutes;
