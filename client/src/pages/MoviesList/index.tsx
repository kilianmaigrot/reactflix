import React, { FC, StrictMode } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import HeaderPageComponent from 'components/Header';
import FooterPageComponent from 'components/Footer';
import BodyPageComponent from 'components/Body';
import MovieBoardContainer from 'containers/MovieBoard';

interface MoviesListProps extends WithTranslation {}

const MoviesList: FC<MoviesListProps> = ({ t }) => (
  <StrictMode>
    <BodyPageComponent pageName={t('pageName.moviesListName')}>
      <HeaderPageComponent />
      <MovieBoardContainer />
      <FooterPageComponent />
    </BodyPageComponent>
  </StrictMode>
);

const MoviesListWithTranslation = withTranslation()(MoviesList);

export default MoviesListWithTranslation;
