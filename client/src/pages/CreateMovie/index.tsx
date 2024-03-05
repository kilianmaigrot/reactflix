import React, { FC, StrictMode } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import HeaderPageComponent from 'components/Header';
import FooterPageComponent from 'components/Footer';
import BodyPageComponent from 'components/Body';
import CreateMovieFormComponent from '../../containers/CreateMovieForm';

interface CreateMovieProps extends WithTranslation {}

const CreateMovie: FC<CreateMovieProps> = ({ t }) => (
  <StrictMode>
    <BodyPageComponent pageName={t('pageName.createMovieName')}>
      <HeaderPageComponent />
      <CreateMovieFormComponent />
      <FooterPageComponent />
    </BodyPageComponent>
  </StrictMode>
);

const CreateMovieWithTranslation = withTranslation()(CreateMovie);

export default CreateMovieWithTranslation;
