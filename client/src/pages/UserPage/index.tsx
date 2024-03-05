import React, { StrictMode } from 'react';
import '../../styles.css';
import { useTranslation } from 'react-i18next';

import UserPageComponent from '../../containers/UserPageContainer';
import HeaderPageComponent from '../../components/Header';
import FooterPageComponent from '../../components/Footer';
import BodyPageComponent from '../../components/Body';

const UserPage = () => {
  const { t } = useTranslation();

  return (
    <StrictMode>
      <BodyPageComponent pageName={t('pageName.userpageName')}>
        <HeaderPageComponent />
        <UserPageComponent />
        <FooterPageComponent />
      </BodyPageComponent>
    </StrictMode>
  );
};

export default UserPage;
