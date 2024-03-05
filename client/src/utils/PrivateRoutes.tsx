import React, { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRoutesProps {
  isAuthenticated: boolean | undefined;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ isAuthenticated }) => (isAuthenticated === true || isAuthenticated === undefined ? <Outlet /> : <Navigate to='/login' />);

export default PrivateRoutes;
