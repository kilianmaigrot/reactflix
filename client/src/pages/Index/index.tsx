import React, { FC, StrictMode } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as SC from './index.style';
import HeaderPageComponent from '../../components/Header';
import FooterPageComponent from '../../components/Footer';
import BodyPageComponent from '../../components/Body';

interface IndexProps extends WithTranslation {}

const Index: FC<IndexProps> = ({ t }) => (
  <StrictMode>
    <BodyPageComponent pageName="L'accueil en React">
      <HeaderPageComponent />
      <SC.StyledMessage>{t('welcomeMessage')}</SC.StyledMessage>
      <FooterPageComponent />
    </BodyPageComponent>
  </StrictMode>
);

const IndexWithTranslation = withTranslation()(Index);

export default IndexWithTranslation;
