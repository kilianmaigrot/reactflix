import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PublicOnlyRoutesProps {
  isAuthenticated: boolean | undefined;
}

const PublicOnlyRoutes: FC<PublicOnlyRoutesProps> = ({ isAuthenticated }) => (
  isAuthenticated === false || isAuthenticated === undefined ? <Outlet /> : <Navigate to='/user' />
);

export default PublicOnlyRoutes;
