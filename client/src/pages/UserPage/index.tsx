import React, { StrictMode } from 'react';
import '../../styles.css';
import { useTranslation } from 'react-i18next';

import UserPageComponent from '../../containers/UserPage';
import { useUserContext } from '../../context/user-context';
import HeaderPageComponent from '../../components/Header';
import FooterPageComponent from '../../components/Footer';
import BodyPageComponent from '../../components/Body';

const UserPage = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();

  if (!user) {
    return null;
  } 
  
  return (
    <StrictMode>
      <BodyPageComponent pageName={t('pageName.userpageName')}>
        <HeaderPageComponent />
        <UserPageComponent
          name={user.name}
          surname={user.surname}
          email={user.email}
          idUser={user.idUser}
        />
        <FooterPageComponent />
      </BodyPageComponent>
    </StrictMode>
  );
};

export default UserPage;
