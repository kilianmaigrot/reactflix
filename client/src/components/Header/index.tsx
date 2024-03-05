import React, { FC } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as SC from './header.style';
import { useUserContext } from '../../context/userContext';
import logo from './img/ReactFlix.png';

interface HeaderComponentProps extends WithTranslation {}

// eslint-disable-next-line complexity
const HeaderPageComponent: FC<HeaderComponentProps> = ({ t }) => {
  const { user } = useUserContext();  
  const userIsLogged = !(user === null || !user.idUser || user.idUser === null || user.idUser === '');
  const userIsAdmin = !(user === null || !user.userRole || user.userRole === null || user.userRole !== 'admin');

  const logoReactflix = logo as string;

  return (
    <SC.PageHeader>
      <a href='/' aria-label='Link to Home Page'>
        <SC.HeaderImage src={logoReactflix} alt='Logo ReactFlix' />
      </a>

      <SC.NavContainer $display={!userIsLogged} id='nonUserNav'>
        <SC.NavButton>
          <a href='/login'>{t('login')}</a>
        </SC.NavButton>
        <SC.NavButton>
          <a href='/inscription'>{t('signUp')}</a>
        </SC.NavButton>
      </SC.NavContainer>

      <SC.NavContainer $display={(userIsLogged && !userIsAdmin)} id='userNav'>
        <SC.NavButton>
          <a href='/moviesList'>{t('accessMovies')}</a>
        </SC.NavButton>
      </SC.NavContainer>

      <SC.NavContainer $display={(userIsLogged && userIsAdmin)} id='adminNav'>
        <SC.NavButton>
          <a href='/moviesList'>{t('accessMovies')}</a>
        </SC.NavButton>
        <SC.NavButton>
          <a href='/createMovie'>{t('createMovie')}</a>
        </SC.NavButton>
      </SC.NavContainer>

      <SC.UserInfos $display={userIsLogged} href='/user' id='userInfos'>
        <p>
          {t('welcome')}
          {user?.surname}
        </p>
      </SC.UserInfos>

      <SC.NavContainer $display={userIsLogged} id='userNav'>
        <SC.NavButton>
          <a href='/user'>{t('userInfos')}</a>
        </SC.NavButton>
        <SC.NavButton>
          <a href='/logout'>{t('logout')}</a>
        </SC.NavButton>
      </SC.NavContainer>
    </SC.PageHeader>
  );
};

const HeaderPageComponentWithTranslation = withTranslation()(HeaderPageComponent);

export default HeaderPageComponentWithTranslation;
