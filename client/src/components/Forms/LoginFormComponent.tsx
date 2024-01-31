import React, {
  FC,
  ReactNode,
  useState,
  useContext,
  ChangeEvent,
  FocusEvent,
  FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../Input';
import * as SC from './form.style';
import { errorsDefault, errorMessages, regexPatterns, errorsTop } from './utils';
import UserContext from '../../context/user-context';

interface LoginFormComponentProps extends WithTranslation {
  errorTop: string
  children: ReactNode,
  onLogin: (success: boolean) => void
}

const LoginFormComponent: FC<LoginFormComponentProps> = ({
  children,
  t,
  errorTop = '',
  onLogin,
}: LoginFormComponentProps) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<object>(errorsDefault);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useContext(UserContext);

  // Vérifie une value si vide et avec un regex, et modifie les erreurs en conséquence
  const checkError = (value: string, regex: RegExp, errorMessage: string, errorName: string) => {
    const emptyError = value === '' ? errorMessages.empty : '';
    const regexError = regex && !regex.test(value) ? errorMessage : '';
    const error = emptyError || regexError;
    setErrors({
      ...errors,
      [errorName]: error,
    });
  };

  // Redéfinition des values à la saisie
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.name === 'email' ? setEmail(event.target.value) : null;
    event.target.name === 'password' ? setPassword(event.target.value) : null;
  };

  // Gère le blur d'un inputArea
  const handleBlur = (inputArea: FocusEvent<HTMLInputElement>) => {
    const regex: RegExp = regexPatterns[inputArea.target.name];
    const errorMessage: string = errorMessages[inputArea.target.name];
    checkError(inputArea.target.value, regex, errorMessage, inputArea.target.name);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({
      email: email === '' ? errorMessages.empty : errors['email'],
      password: password === '' ? errorMessages.empty : errors['password'],
    });
    if (!Object.values(errors).some((value) => value !== '') && email !== '' && password !== '') {
      launchLogin(email, password);
    }
  };

  const launchLogin = async (email: string, password: string) => {
    const postData = { email, password };  
    try {
      const response = await AxiosS.login(postData);  
      switch (response.status) {
        case 200:
          setUser({
            idUser: response.data.userInfos.id_user,
            name: response.data.userInfos.name,
            surname: response.data.userInfos.surname,
            email: response.data.userInfos.email,
            userLanguage: response.data.userInfos.user_language,
          });
          document.cookie = `jwtToken=${response.data.token}`;
          onLogin(true);
          break;  
        case 401:
          navigate("/login/errorLogin");
          break;  
        default:
          navigate("/login/errorServer");
          break;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Gestion du reset
  const handleReset = () => {
    setErrors(errorsDefault);
    setEmail('');
    setPassword('');
    navigate('/login'); // Pour retirer le topmessage si il y en as un
  };

  return (
    <SC.ComponentContainer $side="left">
      <SC.FormContainer id="loginForm" onSubmit={handleSubmit} acceptCharset="UTF-8">
        <p>
          <a href="/">{t('formT.backIndex')}</a>
        </p>
        <SC.FormTitle dangerouslySetInnerHTML={{ __html: t('formT.loginFormTitle') }} />
        <SC.TopFormMessage $message={errorTop}>{errorsTop[errorTop]}</SC.TopFormMessage>
        <InputComponent
          name="email"
          type="email"
          label={t('formT.emailLabel')}
          placeHolder={t('formT.emailPlaceholder')}
          errorMessage={errors['email']}
          onBlur={handleBlur}
          value={email}
          onChange={handleChange}
        />
        <InputComponent
          name="password"
          type="password"
          label={t('formT.passwordLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={errors['password']}
          onBlur={handleBlur}
          value={password}
          onChange={handleChange}
        />
        <a href="/">{t('formT.forgotPassword')}</a>
        <SC.ButtonArea>
          <SC.FormButton type="submit">{t('confirm')}</SC.FormButton>
          <SC.FormButton type="reset" onClick={handleReset}>
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
