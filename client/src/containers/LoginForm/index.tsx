import React, {
  FC, ReactNode, useState, ChangeEvent, FocusEvent, FormEvent, 
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';

import { useUserContext } from '../../context/user-context';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import FormUtils from '../../utils/formUtils';

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

  interface ErrorsType {
    [key: string]: string;
  }

  const { errorMessages, regexPatterns, errorsTop } = FormUtils();
  const [errors, setErrors] = useState<ErrorsType>({});
  const { messageTop } = useParams();
  const [errorTop, setErrorTop] = useState<string>('');
  if (messageTop && errorTop !== messageTop) {
    setErrorTop(messageTop);
  }

  type InputsType = {
    email: string;
    password: string;
  };
  const [inputValues, setInputValues] = useState<InputsType>({
    email: '',
    password: '',
  });

  const { setUser } = useUserContext();

  const updateErrors = (updatedErrorKey: string, updatedError: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [updatedErrorKey]: updatedError,
    }));
  };

  const updateInputValues = (updatedValueKey: string, updatedValue: string) => {
    setInputValues((prevValues) => ({ ...prevValues, [updatedValueKey]: updatedValue }));
  };

  // Vérifie une value si vide et avec un regex, et modifie les erreurs en conséquence
  const checkError = (value: string, regex: RegExp, errorType: string, errorKey: string) => {
    const emptyError: string = value === '' ? errorMessages.empty : '';
    const regexError: string = regex && !regex.test(value) ? errorMessages[errorType] : '';
    const error: string = emptyError !== '' ? emptyError : regexError;
    updateErrors(errorKey, error);
  };

  // Redéfinition des values à la saisie
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateInputValues(event.target.name, event.target.value);
  };

  // Gère le blur d'un inputArea
  const handleBlur = (inputArea: FocusEvent<HTMLInputElement>) => {
    const regex: RegExp = regexPatterns[inputArea.target.name];
    checkError(inputArea.target.value, regex, inputArea.target.name, inputArea.target.name);
    updateInputValues(inputArea.target.name, inputArea.target.value);
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

  const launchLogin = async (userData: InputsType): Promise<string> => {
    try {
      const response = await AxiosS.login(userData);
      const responseData = response.data as SuccessfulLoginResponse;
      setUser({
        idUser: responseData.user.id_user,
        name: responseData.user.name,
        surname: responseData.user.surname,
        email: responseData.user.email,
        userLanguage: responseData.user.user_language,
      });
      onLogin(true);
      const d: Date = new Date();
      d.setTime(d.getTime() + 60 * 60 * 1000);
      document.cookie = `jwtToken=${responseData.token}; expires=${d.toUTCString()}; path=/; secure`;
      return 'editOk';
    } catch (error: unknown) {
      const isUnauthorizedError = (error as AxiosError).response?.status === 401;
      throw isUnauthorizedError ? new Error('errorLogin') : new Error('errorServer');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.entries(inputValues).forEach((entry) => {
      const [key, value] = entry;
      updateErrors(key, value === '' ? errorMessages.empty : errors[key]);
    });
    if (
      !Object.values(errors).some((value) => value !== '')
      && inputValues.email !== ''
      && inputValues.password !== ''
    ) {
      launchLogin(inputValues)
        .then((result) => {
          result === 'editOk' ? navigate('/user') : setErrorTop('errorExistingUser');
        })
        .catch((err) => setErrorTop((err as Error).message));
    }
  };

  // Gestion du reset
  const handleReset = () => {
    setErrors({});
    setInputValues({
      email: '',
      password: '',
    });
    setErrorTop('');
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
          errorMessage={errors.email}
          onBlur={handleBlur}
          value={inputValues.email}
          onChange={handleChange}
        />
        <InputComponent
          name='password'
          type='password'
          label={t('formT.passwordLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={errors.password}
          onBlur={handleBlur}
          value={inputValues.password}
          onChange={handleChange}
        />
        <a href='/'>{t('formT.forgotPassword')}</a>
        <SC.ButtonArea>
          <SC.FormButton type='submit'>{t('confirm')}</SC.FormButton>
          <SC.FormButton type='reset' onClick={handleReset}>
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
