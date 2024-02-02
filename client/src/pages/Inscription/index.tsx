import React, { FC, StrictMode } from 'react';
import '../../styles.css';
import { useTranslation } from 'react-i18next';

import RegisterFormComponent from '../../containers/RegisterForm';
import BodyPageComponent from '../../components/Body/index';
import FooterPageComponent from '../../components/Footer';

const Inscription:FC = () => {
  const { t } = useTranslation();

  return (
    <StrictMode>
      <BodyPageComponent pageName={t('pageName.indexName')}>
        <RegisterFormComponent>
          <FooterPageComponent />
        </RegisterFormComponent>
      </BodyPageComponent>
    </StrictMode>
  );
};

export default Inscription;
