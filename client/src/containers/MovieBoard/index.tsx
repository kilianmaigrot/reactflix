import React, { FC, useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import MovieTileComponent, { MovieTileObject } from 'components/MovieTile';
import * as AxiosS from 'services/axios.service';
import MovieSearchBarComponent, { FormDataSearchBar } from 'components/MovieSearchBar';
import MovieSearchFooter, { FooterDataSearchBar } from 'components/MovieSearchFooter/';
import { useUserContext } from '../../context/userContext';
import * as SC from './movieBoard.style';

interface MovieData {
  count: number;
}

interface QueryData {
  searchParam: string; 
  searchText: string; 
  sortParam: string; 
  sortOrder: string;
  limit: number; 
  offset: number;
}

const MovieBoardComponent: FC<WithTranslation> = () => {
  const [moviesData, setMoviesData] = useState<Array<MovieTileObject>>([]);
  const [movieTotal, setMovieTotal] = useState<number>(0);
  const [errorTop, setErrorTop] = useState<string>('');
  const [queryData, setQueryData] = useState<QueryData>({
    searchParam: 'title',
    searchText: '',
    sortParam: 'id_movie',
    sortOrder: 'ASC',
    limit: 9, 
    offset: 0, 
  });
  const { user } = useUserContext();  
  const userIsAdmin = (user.userRole === 'admin' ? 'admin' : 'user');
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);

  const getSomeMovies = async (data: QueryData): Promise<Array<MovieTileObject>> => {
    const response = await AxiosS.getSomeMovies(data);
    return response.data as Array<MovieTileObject>;
  };

  const getMovieAmount = (data: QueryData) => {
    AxiosS.getAllMoviesCount(data)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const movieData = response.data[0] as MovieData;
          setMovieTotal(movieData.count);
        } else {
          throw new Error('Réponse de la requête invalide ou vide.');
        }
      })
      .catch((err) => {
        throw err;
      });
  }; 

  const deleteMovie = (idMovie: number) => {
    AxiosS.deleteMovieById({ idMovie })
      .then((response) => {
        if (response.status !== 200) {
          setErrorTop('Une erreur s\'est produite lors de la suppression du film, veuillez retenter d\'ici quelques minutes ou contactez votre administrateur réseau.');
        } else { setForceUpdate(!forceUpdate); }
      })
      .catch((error) => {
        setErrorTop(`Une erreur s'est produite lors de la suppression du film, veuillez retenter d'ici quelques minutes ou contactez votre administrateur réseau. Erreur : ${error as string}`);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSomeMovies(queryData);
        setMoviesData(data);
      } catch (error) {
        setErrorTop(`Une erreur s'est produite lors de la récupération des films, veuillez retenter d'ici quelques minutes ou contactez votre administrateur réseau. Erreur : ${error as string}`);
      }
    };
    fetchData().catch(() => null);
  }, [queryData, forceUpdate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getMovieAmount(queryData);
      } catch (error) {
        setErrorTop(`Une erreur s'est produite lors de la récupération des films, veuillez retenter d'ici quelques minutes ou contactez votre administrateur réseau. Erreur : ${error as string}`);
      }
    };
    fetchData().catch(() => null);
    // eslint-disable-next-line
  }, [queryData.searchParam, queryData.searchText, forceUpdate]);

  const onConfirmSearchBar = (formData: FormDataSearchBar) => {
    setQueryData({
      ...queryData,
      searchParam: formData.searchParam,
      searchText: formData.searchText,
      sortParam: formData.sortParam,
      sortOrder: formData.sortOrder,
      offset: 0,
    });
  };

  const onChangeFooter = (formData: FooterDataSearchBar) => {
    setQueryData({
      ...queryData,
      limit: formData.limit,
      offset: formData.offset,
    });
  };

  return (
    <SC.MovieListContainer>
      <SC.TopFormMessage $message={errorTop}>{errorTop}</SC.TopFormMessage>
      <MovieSearchBarComponent onConfirm={onConfirmSearchBar} />
      <SC.MovieBoardContainer>
        {moviesData.map((movie: MovieTileObject) => (
          <MovieTileComponent
            key={movie.id_movie}
            movieData={movie}
            adminDisplay={userIsAdmin}
            onDelete={deleteMovie}
          />
        ))}
      </SC.MovieBoardContainer>
      <MovieSearchFooter onChange={onChangeFooter} movieTotal={movieTotal} />
    </SC.MovieListContainer>
  );
};

const MovieBoardComponentWithTranslation = withTranslation()(MovieBoardComponent);

export default MovieBoardComponentWithTranslation;
