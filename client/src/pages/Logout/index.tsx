import React, { FC, StrictMode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserContext } from '../../context/userContext';
import HeaderPageComponent from '../../components/Header';
import BodyPageComponent from '../../components/Body';
import StyledLogoutMessage from './logout.style';

const Logout: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  useEffect(() => {
    const handleLogout = () => {
      setUser({
        idUser: '',
        name: '',
        surname: '',
        email: '',
        userLanguage: user.userLanguage,
        userRole: '',
      });
      document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setTimeout(() => {
        navigate('/');
      }, 1500);
    };

    handleLogout();
  }, [navigate, setUser, user.userLanguage]);

  return (
    <StrictMode>
      <BodyPageComponent pageName={t('pageName.logoutName')}>
        <HeaderPageComponent />
        <StyledLogoutMessage>{t('logoutMessage')}</StyledLogoutMessage>
      </BodyPageComponent>
    </StrictMode>
  );
};

export default Logout;
