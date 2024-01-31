import React, { StrictMode } from 'react';
import '../../styles.css';
import { useParams } from 'react-router-dom';

import { LoginFormComponent } from '../../components/Forms';
import BodyPageComponent from '../../components/Body/index';
import FooterPageComponent from '../../components/Footer';

const Login = ({ onLogin }: { onLogin: (success: boolean) => void }) => {
  const { errorLogin } = useParams();

  return (
    <StrictMode>
      <BodyPageComponent pageName='Le Login en React'>
        <LoginFormComponent errorTop={errorLogin} onLogin={onLogin}>
          <FooterPageComponent />
        </LoginFormComponent>
      </BodyPageComponent>
    </StrictMode>
  );
};

export default Login;
