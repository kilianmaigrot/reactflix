import React, { FC, StrictMode } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import HeaderPageComponent from 'components/Header';
import FooterPageComponent from 'components/Footer';
import BodyPageComponent from 'components/Body';
import StyledMessage from './index.style';

interface IndexProps extends WithTranslation {}

const Index: FC<IndexProps> = ({ t }) => (
  <StrictMode>
    <BodyPageComponent pageName={t('pageName.indexName')}>
      <HeaderPageComponent />
      <StyledMessage>{t('welcomeMessage')}</StyledMessage>
      <FooterPageComponent />
    </BodyPageComponent>
  </StrictMode>
);

const IndexWithTranslation = withTranslation()(Index);

export default IndexWithTranslation;
