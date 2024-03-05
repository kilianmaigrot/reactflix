import React, {
  FC, ReactNode, useState, ChangeEvent, FocusEvent, FormEvent, 
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';

import { useUserContext } from '../../context/userContext';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import FormUtils from '../../utils/formUtils';
import useFormValues from '../../hooks/useFormValues';

interface LoginFormComponentProps {
  children: ReactNode;
  onLogin: (success: boolean) => void;
}

const LoginFormComponent: FC<LoginFormComponentProps> = ({
  children,
  onLogin,
}: LoginFormComponentProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { 
    state: inputValues, editValue, editError, restartInputValues,
  } = useFormValues({
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  });

  const { errorMessages, regexPatterns, errorsTop } = FormUtils();
  const { messageTop } = useParams();
  const [errorTop, setErrorTop] = useState<string>('');
  if (messageTop && errorTop !== messageTop) {
    setErrorTop(messageTop);
  }

  const { setUser } = useUserContext();

  // Vérifie une value si vide et avec un regex, et modifie les erreurs en conséquence
  const checkError = (value: string, regex: RegExp, errorType: string, errorKey: string) => {
    const emptyError: string = value === '' ? errorMessages.empty : '';
    const regexError: string = regex && !regex.test(value) ? errorMessages[errorType] : '';
    const error: string = emptyError !== '' ? emptyError : regexError;
    editError({ inputKey: errorKey, error });
  };

  // Redéfinition des values à la saisie
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    editValue({ inputKey: event.target.id, value: event.target.value });
  };

  // Gère le blur d'un inputArea
  const handleBlur = (inputArea: FocusEvent<HTMLInputElement>) => {
    const regex: RegExp = regexPatterns[inputArea.target.name];
    checkError(inputArea.target.value, regex, inputArea.target.id, inputArea.target.id);
    editValue({ inputKey: inputArea.target.id, value: inputArea.target.value });
  };

  // Gestion de la soumission du formulaire
  interface SuccessfulLoginResponse {
    token: string;
    user: {
      id_user: string;
      name: string;
      surname: string;
      email: string;
      user_language: string;
    };
  }

  type UserData = {
    email: string;
    password: string;
  };

  const launchLogin = async (userData: UserData): Promise<string> => {
    try {
      const response = await AxiosS.login(userData);        
      const responseData = response.data as SuccessfulLoginResponse;    
      onLogin(true);       
      const d: Date = new Date();
      d.setTime(d.getTime() + 60 * 60 * 1000);
      document.cookie = `jwtToken=${responseData.token}; expires=${d.toUTCString()}; path=/; secure`;  
      setUser({
        idUser: responseData.user.id_user,
        name: responseData.user.name,
        surname: responseData.user.surname,
        email: responseData.user.email,
        userLanguage: responseData.user.user_language,
      });      
      return 'loginOk';
    } catch (error: unknown) {   
      let errorThrown:Error | null = new Error('errorServer');
      (error as AxiosError).response?.status === 401 && (errorThrown = new Error('errorLogin'));
      (error as AxiosError).response?.status === 429 && (errorThrown = new Error('errorAPILimiting'));
      throw errorThrown; 
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {    
    event.preventDefault();
    let problemDetected = false;
    const submitData = { 
      email: inputValues.email.value,
      password: inputValues.password.value,
    };
    
    Object.entries(submitData).forEach((entry) => {
      const [key, value] = entry;
      editError({ inputKey: key, error: value === '' ? errorMessages.empty : inputValues[key].error });
      problemDetected = (value === '' || inputValues[key].error !== '') && true;
    });
    
    if (!problemDetected) {
      launchLogin(submitData)
        .then((result) => {
          result === 'loginOk' ? navigate('/user') : setErrorTop('errorExistingUser');
        })
        .catch((err) => {
          setErrorTop((err as Error).message);
        });
    }
  };

  return (
    <SC.ComponentContainer $side='left'>
      <SC.FormContainer id='loginForm' onSubmit={handleSubmit} acceptCharset='UTF-8'>
        <p>
          <a href='/'>{t('formT.backIndex')}</a>
        </p>
        <SC.FormTitle dangerouslySetInnerHTML={{ __html: t('formT.loginFormTitle') }} />
        <SC.TopFormMessage $message={errorTop}>{errorsTop[errorTop]}</SC.TopFormMessage>
        <InputComponent
          name='email'
          type='email'
          label={t('formT.emailLabel')}
          placeHolder={t('formT.emailPlaceholder')}
          errorMessage={inputValues.email.error}
          onBlur={handleBlur}
          value={inputValues.email.value}
          onChange={handleChange}
          autofocus
          autoComplete='email'
        />
        <InputComponent
          name='password'
          type='password'
          label={t('formT.passwordLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={inputValues.password.error}
          onBlur={handleBlur}
          value={inputValues.password.value}
          onChange={handleChange}
          autoComplete='current-password'
        />
        <a href='/'>{t('formT.forgotPassword')}</a>
        <SC.ButtonArea>
          <SC.FormButton type='submit'>{t('confirm')}</SC.FormButton>
          <SC.FormButton type='reset' onClick={restartInputValues}>
            {t('cancel')}
          </SC.FormButton>
        </SC.ButtonArea>
        <p dangerouslySetInnerHTML={{ __html: t('formT.noAccount') }} />
      </SC.FormContainer>
      {children}
    </SC.ComponentContainer>
  );
};

export default LoginFormComponent;
