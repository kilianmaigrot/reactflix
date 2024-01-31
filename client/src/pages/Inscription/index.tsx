import React, { StrictMode } from 'react';
import '../../styles.css';

import { RegisterFormComponent } from '../../components/Forms';
import BodyPageComponent from '../../components/Body/index';
import FooterPageComponent from '../../components/Footer';

const Inscription = () => (
  <StrictMode>
    <BodyPageComponent pageName="L'inscription en React">
      <RegisterFormComponent>
        <FooterPageComponent />
      </RegisterFormComponent>
    </BodyPageComponent>
  </StrictMode>
);

export default Inscription;
