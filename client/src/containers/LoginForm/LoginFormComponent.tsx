import React, {
  FC,
  ReactNode,
  useState,
  useContext,
  ChangeEvent,
  FocusEvent,
  FormEvent,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import { UserContext } from '../../context/user-context';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import { 
  errorMessages, regexPatterns, errorsTop,
} from '../../utils/formUtils';

interface LoginFormComponentProps extends WithTranslation {
  children: ReactNode;
  onLogin: (success: boolean) => void;
}

const LoginFormComponent: FC<LoginFormComponentProps> = ({
  children,
  t,
  onLogin,
}: LoginFormComponentProps) => {
  const navigate = useNavigate();

  interface ErrorsType {    
    email?: string;
    password?: string;
    errorTop?: string;
  }
  
  const [errors, setErrors] = useState<ErrorsType>({});
  const { messageTop } = useParams();
  const [errorTop, setErrorTop] = useState<string>('');
  if (messageTop) {
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
  const { setUser } = useContext(UserContext);
  
  const updateErrors = (updatedErrorKey: string, updatedError: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, updatedErrorKey: [updatedError] }));
  };

  const updateInputValues = (updatedValueKey: string, updatedValue: string) => {
    setInputValues((prevValues) => ({ ...prevValues, updatedValueKey: [updatedValue] }));
  };

  // Vérifie une value si vide et avec un regex, et modifie les erreurs en conséquence
  const checkError = (value: string, regex: RegExp, errorType: string, errorKey: string) => {
    const emptyError: string = value === '' ? errorMessages.empty : '';
    const regexError: string = regex && !regex.test(value) ? errorMessages[errorType] as string : '';
    const error: string = emptyError !== '' ? emptyError : regexError;
    updateErrors(errorKey, error);
  };

  // Redéfinition des values à la saisie
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
    updateInputValues(event.target.name, event.target.value);
  };

  // Gère le blur d'un inputArea
  const handleBlur = (inputArea: FocusEvent<HTMLInputElement>) => {
    const regex: RegExp = regexPatterns[inputArea.target.name] as RegExp;
    checkError(inputArea.target.value, regex, inputArea.target.name, inputArea.target.name);
    updateInputValues(inputArea.target.name, inputArea.target.value);
  };

  // Gestion de la soumission du formulaire
  interface SuccessfulLoginResponse {
    userInfos: {
      id_user: string;
      name: string;
      surname: string;
      email: string;
      user_language: string;
    };
  }
  
  const launchLogin = (userData: InputsType) => AxiosS.login(userData)
    .then((response) => {
      if ('data' in response && typeof response.data === 'object') {
        const responseData = response.data as SuccessfulLoginResponse;
        setUser((prevUser) => ({
          ...prevUser,
          idUser: responseData.userInfos.id_user,
          name: responseData.userInfos.name,
          surname: responseData.userInfos.surname,
          email: responseData.userInfos.email,
          userLanguage: responseData.userInfos.user_language,
        }));
        onLogin(true);
        return 'editOk';
      }
      throw new Error('errorLogin');
    })
    .catch(() => { throw new Error('errorServer'); });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.entries(inputValues).forEach((entry) => {
      const [key, value] = entry;
      updateErrors(key, value === '' ? errorMessages.empty : errors[key] as string);
    });
    if (!Object.values(errors).some((value) => value !== '') && inputValues.email !== '' && inputValues.password !== '') {
      launchLogin(inputValues)
        .then((result) => { result === 'editOk' ? navigate('/user') : setErrorTop('errorExistingUser'); })
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

const LoginFormWithTranslation = withTranslation()(LoginFormComponent);

export default LoginFormWithTranslation;
