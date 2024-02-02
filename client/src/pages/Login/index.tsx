import React, { StrictMode } from 'react';
import '../../styles.css';
import { useTranslation } from 'react-i18next';

import LoginFormComponent from '../../containers/LoginForm';
import BodyPageComponent from '../../components/Body/index';
import FooterPageComponent from '../../components/Footer';

const Login = ({ onLogin }: { onLogin: (success: boolean) => void }) => {
  const { t } = useTranslation();

  return (
    <StrictMode>
      <BodyPageComponent pageName={t('pageName.loginName')}>
        <LoginFormComponent onLogin={onLogin}>
          <FooterPageComponent />
        </LoginFormComponent>
      </BodyPageComponent>
    </StrictMode>
  );
};

export default Login;
