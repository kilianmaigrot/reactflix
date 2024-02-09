import React, { FC } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as SC from './header.style';
import { useUserContext } from '../../context/userContext';

interface HeaderComponentProps extends WithTranslation {}

const HeaderPageComponent: FC<HeaderComponentProps> = ({ t }) => {
  const { user } = useUserContext();
  const displayNav = !!(user === null || !user.idUser || user.idUser === null);

  return (
    <SC.PageHeader>
      <a href='/' aria-label='Link to Home Page'>
        <SC.HeaderImage src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/langfr-1024px-React_Logo_SVG.svg.png' />
      </a>

      <SC.NavContainer $display={displayNav} id='nonUserNav'>
        <SC.NavButton>
          <a href='/login'>{t('login')}</a>
        </SC.NavButton>
        <SC.NavButton>
          <a href='/inscription'>{t('signUp')}</a>
        </SC.NavButton>
      </SC.NavContainer>

      <SC.UserInfos $display={!displayNav} href='/user' id='userInfos'>
        <p>
          {t('welcome')}
          {user?.surname}
        </p>
      </SC.UserInfos>

      <SC.NavContainer $display={!displayNav} id='userNav'>
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
