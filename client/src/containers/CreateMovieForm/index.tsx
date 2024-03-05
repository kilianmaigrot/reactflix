import React, {
  FC, useState, ChangeEvent, FocusEvent, FormEvent, 
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import TextareaComponent from '../../components/Textarea';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import FormUtils from '../../utils/formUtils';
import useFormValues from '../../hooks/useFormValues';

const CreateMovieFormComponent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { 
    state: inputValues, editValue, editError, restartInputValues,
  } = useFormValues({
    title: {
      value: '',
      error: '',
    },
    year: {
      value: '',
      error: '',
    },
    director: {
      value: '',
      error: '',
    },
    genre: {
      value: '',
      error: '',
    },
    runtime: {
      value: '',
      error: '',
    },
    summary: {
      value: '',
      error: '',
    },
    posterLink: {
      value: '',
      error: '',
    },
    trailerLink: {
      value: '',
      error: '',
    },
    actor1Name: {
      value: '',
      error: '',
    },
    actor1Role: {
      value: '',
      error: '',
    },
    actor2Name: {
      value: '',
      error: '',
    },
    actor2Role: {
      value: '',
      error: '',
    },
    actor3Name: {
      value: '',
      error: '',
    },
    actor3Role: {
      value: '',
      error: '',
    },
  });

  const { errorMessages, errorsTop } = FormUtils();
  const [errorTop, setErrorTop] = useState<string>('');

  // Vérifie une value si vide et avec un regex, et modifie les erreurs en conséquence
  const checkError = (value: string, regex: RegExp, errorType: string, errorKey: string) => {
    const emptyError: string = value === '' ? errorMessages.empty : '';
    const regexError: string = regex && !regex.test(value) ? errorMessages[errorType] : '';
    const error: string = emptyError !== '' ? emptyError : regexError;
    editError({ inputKey: errorKey, error });
  };

  // Redéfinition des values à la saisie
  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    editValue({ inputKey: event.target.id, value: event.target.value });
  };

  // Gère le blur d'un inputArea
  const handleBlur = (inputArea: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => {
    if (inputArea.target.name === 'title') {
      checkError(inputArea.target.value, /.*/, inputArea.target.id, inputArea.target.id);
    }
    editValue({ inputKey: inputArea.target.id, value: inputArea.target.value });
  };

  // Gestion de la soumission du formulaire
  type MovieObject = {
    title: string;
    year: string;
    director: string;
    genre: string;
    runtime: string;
    summary: string;
    posterLink: string;
    trailerLink: string;
    actors: Array<{
      actorName: string;
      actorRole: string;
    }>;
  };

  const launchMovieCreation = (movieData: MovieObject) => AxiosS.createMovie(movieData)
    .then((response) => {
      if (response.status === 201) {
        navigate('/moviesList/creationOk');
        return 'creationOk';
      }
      throw new Error('errorServer');
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 409) {
        throw new Error('errorExistingMovie');
      }
      throw new Error('errorServer');
    });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitData: MovieObject = { 
      title: inputValues.title.value,
      year: inputValues.year.value,
      director: inputValues.director.value,
      genre: inputValues.genre.value,
      runtime: inputValues.runtime.value,
      summary: inputValues.summary.value,
      posterLink: inputValues.posterLink.value,
      trailerLink: inputValues.trailerLink.value,
      actors: [],
    };
    
    // Ajout des acteurs si leur nom est saisi
    inputValues.actor1Name.value.trim() !== '' && submitData.actors.push({ actorName: inputValues.actor1Name.value, actorRole: inputValues.actor1Role.value });
    inputValues.actor2Name.value.trim() !== '' && submitData.actors.push({ actorName: inputValues.actor2Name.value, actorRole: inputValues.actor2Role.value });
    inputValues.actor3Name.value.trim() !== '' && submitData.actors.push({ actorName: inputValues.actor3Name.value, actorRole: inputValues.actor3Role.value });

    inputValues.title.error === '' && launchMovieCreation(submitData).catch((err) => setErrorTop((err as Error).message));
  };

  return (
    // Styled compoonents
    <SC.ComponentContainer $side='right'>
      <SC.FormContainer id='createMovieForm' onSubmit={handleSubmit} acceptCharset='UTF-8'>
        <SC.FormTitle dangerouslySetInnerHTML={{ __html: t('formT.createMovieFormTitle') }} />
        <SC.TopFormMessage $message={errorTop}>{errorsTop[errorTop]}</SC.TopFormMessage>
        <InputComponent
          name='title'
          type='text'
          label={t('formT.movieTitleLabel')}
          placeHolder=''
          errorMessage={inputValues.title.error}
          onBlur={handleBlur}
          value={inputValues.title.value}
          onChange={handleChange}          
          autoComplete='off'
        />
        <InputComponent
          name='year'
          type='number'
          label={t('formT.movieYearLabel')}
          placeHolder=''
          errorMessage={inputValues.year.error}
          onBlur={handleBlur}
          value={inputValues.year.value}
          onChange={handleChange}
          autoComplete='off'
        />
        <InputComponent
          name='director'
          type='text'
          label={t('formT.movieDirectorLabel')}
          placeHolder=''
          errorMessage={inputValues.director.error}
          onBlur={handleBlur}
          value={inputValues.director.value}
          onChange={handleChange}
          autoComplete='off'
        />
        <InputComponent
          name='genre'
          type='text'
          label={t('formT.movieGenreLabel')}
          placeHolder=''
          errorMessage={inputValues.genre.error}
          onBlur={handleBlur}
          value={inputValues.genre.value}
          onChange={handleChange}
          autoComplete='off'
        />
        <InputComponent
          name='runtime'
          type='number'
          label={t('formT.movieRuntimeLabel')}
          placeHolder=''
          errorMessage={inputValues.runtime.error}
          onBlur={handleBlur}
          value={inputValues.runtime.value}
          onChange={handleChange}
          autoComplete='off'
        />
        <TextareaComponent
          name='summary'
          label={t('formT.movieSummaryLabel')}
          placeHolder=''
          errorMessage={inputValues.summary.error}
          onBlur={handleBlur}
          value={inputValues.summary.value}
          onChange={handleChange}
          autoComplete='off'
        />
        <InputComponent
          name='posterLink'
          type='text'
          label={t('formT.moviePosterLinkLabel')}
          placeHolder=''
          errorMessage={inputValues.posterLink.error}
          onBlur={handleBlur}
          value={inputValues.posterLink.value}
          onChange={handleChange}
          autoComplete='off'
        />
        <InputComponent
          name='trailerLink'
          type='text'
          label={t('formT.movieTrailerLinkLabel')}
          placeHolder=''
          errorMessage={inputValues.trailerLink.error}
          onBlur={handleBlur}
          value={inputValues.trailerLink.value}
          onChange={handleChange}
          autoComplete='off'
        />
        <SC.FormTitle>{t('formT.movieActorPartLabel')}</SC.FormTitle>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <InputComponent
              name='actor1Name'
              type='text'
              label={t('formT.movieActorName')}
              placeHolder=''
              errorMessage={inputValues.actor1Name.error}
              onBlur={handleBlur}
              value={inputValues.actor1Name.value}
              onChange={handleChange}
              autoComplete='off'
            />
          </li>
          <li>
            <InputComponent
              name='actor1Role'
              type='text'
              label={t('formT.movieActorRole')}
              placeHolder=''
              errorMessage={inputValues.actor1Role.error}
              onBlur={handleBlur}
              value={inputValues.actor1Role.value}
              onChange={handleChange}
              autoComplete='new-password'
            />
          </li>
          <li>
            <InputComponent
              name='actor2Name'
              type='text'
              label={t('formT.movieActorName')}
              placeHolder=''
              errorMessage={inputValues.actor1Name.error}
              onBlur={handleBlur}
              value={inputValues.actor2Name.value}
              onChange={handleChange}
              autoComplete='off'
            />
          </li>
          <li>
            <InputComponent
              name='actor2Role'
              type='text'
              label={t('formT.movieActorRole')}
              placeHolder=''
              errorMessage={inputValues.actor1Role.error}
              onBlur={handleBlur}
              value={inputValues.actor2Role.value}
              onChange={handleChange}
              autoComplete='new-password'
            />
          </li>
          <li>
            <InputComponent
              name='actor3Name'
              type='text'
              label={t('formT.movieActorName')}
              placeHolder=''
              errorMessage={inputValues.actor1Name.error}
              onBlur={handleBlur}
              value={inputValues.actor3Name.value}
              onChange={handleChange}
              autoComplete='off'
            />
          </li>
          <li>
            <InputComponent
              name='actor3Role'
              type='text'
              label={t('formT.movieActorRole')}
              placeHolder=''
              errorMessage={inputValues.actor1Role.error}
              onBlur={handleBlur}
              value={inputValues.actor3Role.value}
              onChange={handleChange}
              autoComplete='new-password'
            />
          </li>
        </ul>
        <SC.ButtonArea>
          <SC.FormButton type='submit'>{t('confirm')}</SC.FormButton>
          <SC.FormButton type='reset' onClick={restartInputValues}>
            {t('cancel')}
          </SC.FormButton>
        </SC.ButtonArea>
      </SC.FormContainer>
    </SC.ComponentContainer>
  );
};

export default CreateMovieFormComponent;
