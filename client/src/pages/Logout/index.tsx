import React, { FC, StrictMode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useUserContext } from '../../context/user-context';
import HeaderPageComponent from '../../components/Header';
import BodyPageComponent from '../../components/Body';
import StyledLogoutMessage from './logout.style';

interface LogoutProps extends WithTranslation {}

const Logout: FC<LogoutProps> = ({ t }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const handleLogout = () => {
      setUser({
        idUser: null,
        name: null,
        surname: null,
        email: null,
        userLanguage: user.userLanguage,
      });
      document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setTimeout(() => {
        navigate('/');
      }, 1500);
    };

    handleLogout();
  }, [navigate, setUser]);

  return (
    <StrictMode>
      <BodyPageComponent pageName='Le Login en React'>
        <HeaderPageComponent />
        <StyledLogoutMessage>{t('logoutMessage')}</StyledLogoutMessage>
      </BodyPageComponent>
    </StrictMode>
  );
};

const LogoutWithTranslation = withTranslation()(Logout);

export default LogoutWithTranslation;
