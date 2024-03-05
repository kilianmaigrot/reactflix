import React, { FC, useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const AdminRoutes: FC = () => {
  const { user } = useUserContext();
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsAdmin(user.userRole === 'admin');
  }, [user]);

  let routeElement = null;

  if (isAdmin === true) {
    routeElement = <Outlet />;
  } else if (isAdmin === false) {
    routeElement = <Navigate to='/user' replace />;
  }

  return routeElement;
};

export default AdminRoutes;
