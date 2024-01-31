import React, { StrictMode } from 'react';
import '../../styles.css';

import UserPageComponent from '../../components/UserPage';
import { useUserContext } from '../../context/user-context';
import HeaderPageComponent from '../../components/Header';
import FooterPageComponent from '../../components/Footer';
import BodyPageComponent from '../../components/Body';

const UserPage = () => {
  const { user } = useUserContext();

  if (!user) {
    return null;
  }

  return (
    <StrictMode>
      <BodyPageComponent pageName='Le Login en React'>
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
