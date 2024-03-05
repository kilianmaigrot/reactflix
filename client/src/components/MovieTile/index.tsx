import React, { FC, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModaleComponent from 'components/Modale';
import * as SC from './movieTile.style';

interface Actor {
  id_movie: number;
  actor_name: string;
  actor_role: string;
}

export interface MovieTileObject {
  title: string;
  year: number;
  director: string;
  genre: string;
  runtime: number;
  summary: string;
  poster_link: string;
  trailer_link: string;
  actors: Array<Actor>;
  id_movie: number;
}

interface MovieTileComponentProps extends WithTranslation {
  movieData: MovieTileObject;
  adminDisplay: string;
  onDelete: (movieId: number) => void;
}

const MovieTileComponent: FC<MovieTileComponentProps> = ({
  movieData,
  adminDisplay,  
  onDelete,
}: MovieTileComponentProps) => {
  const [modaleOpen, setModaleOpen] = useState<boolean>(false);
  const onDeleteMovie = (movieId: number) => {
    setModaleOpen(false);
    onDelete(movieId);
  };
  const displayAdmin = adminDisplay;
  const movieRuntimeEdited: string = Math.floor(movieData.runtime / 60) > 1 ? `${Math.floor(movieData.runtime / 60)} heures et ${movieData.runtime % 60} minutes` : `${Math.floor(movieData.runtime / 60)} heure et ${movieData.runtime % 60} minutes`;

  const ActorsList = (
    <>
      <h4>Acteurs principaux :</h4>
      <ul>
        {movieData.actors.map((actor) => (
          <li key={`${actor.actor_name}-${actor.actor_role}`}>
            {actor.actor_name} 
            &nbsp;dans le rôle de&nbsp;
            {actor.actor_role}
          </li>
        ))}
      </ul>
    </>
  );
  
  return (
    <SC.MovieTileContainer>
      <SC.TopPart>
        <ModaleComponent open={modaleOpen} movieData={movieData} onClose={() => setModaleOpen(false)} onDelete={onDeleteMovie} />
        <SC.MoviePoster src={movieData.poster_link} />
        <SC.TopPartHalf>
          <SC.MovieTitle>{movieData.title}</SC.MovieTitle>
          <SC.AdminDeleteButton $display={displayAdmin} onClick={() => setModaleOpen(true)}>
            <FontAwesomeIcon icon={faTrash} />
          </SC.AdminDeleteButton>
          <SC.MovieDetails>
            <ul>
              <li>
                Film sorti en&nbsp;
                {movieData.year}
              </li>
              <li>
                Réalisé par&nbsp;
                {movieData.director}
              </li>
              <li>
                Genre cinématographique :&nbsp;
                {movieData.genre}
              </li>
              <li>
                Durée :&nbsp;
                {movieRuntimeEdited}
              </li>
            </ul>
          </SC.MovieDetails>
          <SC.ButtonTrailer><a href={movieData.trailer_link}>Accéder au trailer</a></SC.ButtonTrailer>
        </SC.TopPartHalf>
      </SC.TopPart>
      <SC.MovieResume>
        {movieData.summary}
      </SC.MovieResume>
      <SC.ActorsArea>
        {ActorsList}
      </SC.ActorsArea>
    </SC.MovieTileContainer>
  );
};

const MovieTileComponentWithTranslation = withTranslation()(MovieTileComponent);

export default MovieTileComponentWithTranslation;
