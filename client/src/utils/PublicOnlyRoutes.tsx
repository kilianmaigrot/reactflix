import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PublicOnlyRoutesProps {
  isAuthenticated: boolean
}

const PublicOnlyRoutes: FC<PublicOnlyRoutesProps> = ({ isAuthenticated }) => (isAuthenticated ? <Navigate to="/user" /> : <Outlet />);

export default PublicOnlyRoutes;
