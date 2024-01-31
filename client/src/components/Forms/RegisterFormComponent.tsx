import React, {
  FC, ReactNode, useState, ChangeEvent, FocusEvent, FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../Input';
import * as SC from './form.style';
import { errorsDefault, errorMessages, regexPatterns, errorsTop } from './utils';

interface RegisterFormComponentProps extends WithTranslation {
  children: ReactNode
}

const RegisterFormComponent: FC<RegisterFormComponentProps> = ({ children, t }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<object>(errorsDefault);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Vérifie une value si vide et avec un regex, et modifie les erreurs en conséquence
  const checkError = (value: string, regex: RegExp, errorMessage: string, errorName: string) => {
    const emptyError: string = value === '' ? errorMessages.empty : '';
    const regexError: string = regex && !regex.test(value) ? errorMessage : '';
    const error: string = emptyError || regexError;
    setErrors({
      ...errors,
      [errorName]: error,
    });
  };

  // Redéfinition des values à la saisie
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.name === 'name' && setName(event.target.value);
    event.target.name === 'surname' && setSurname(event.target.value);
    event.target.name === 'email' && setEmail(event.target.value);
    event.target.name === 'password' && setPassword(event.target.value);
  };

  // Gère le blur d'un inputArea
  const handleBlur = (inputArea: FocusEvent<HTMLInputElement>) => {
    const regex: RegExp = regexPatterns[inputArea.target.name];
    const errorMessage: string = errorMessages[inputArea.target.name];

    checkError(inputArea.target.value, regex, errorMessage, inputArea.target.name);

    inputArea.target.name === 'name' && setName(inputArea.target.value);
    inputArea.target.name === 'surname' && setSurname(inputArea.target.value);
    inputArea.target.name === 'email' && setEmail(inputArea.target.value);
    inputArea.target.name === 'password' && setPassword(inputArea.target.value);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
    setErrors({
      name: name === "" ? errorMessages.empty : errors["name"],
      surname: surname === "" ? errorMessages.empty : errors["surname"],
      email: email === "",
      password: password === "",
      register: "",
    });
  
    if (
      !Object.values(errors).some((value) => value !== "") &&
      name !== "" &&
      surname !== "" &&
      email !== "" &&
      password !== ""
    ) {
      launchRegistration(name, surname, email, password);
    }
  };
  
  const launchRegistration = async (name: string, surname: string, email: string, password: string) => {
    const postData = {
      name,
      surname,
      email,
      password,
    };
  
    try {
      const response = await AxiosS.register(postData);
  
      switch (response) {
        case 200:
          navigate("/login/inscriptionOk");
          break;
  
        case 401:
          setErrors({ ...errors, register: 'Un utilisateur existe déjà avec cette adresse email' });
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
    setName('');
    setSurname('');
    setEmail('');
    setPassword('');
    navigate('/inscription'); // Pour effacer le messageTop si il y en as un
  };

  return (
    // Styled compoonents
    <SC.ComponentContainer $side="right">
      <SC.FormContainer id="registerForm" onSubmit={handleSubmit} acceptCharset="UTF-8">
        <SC.FormTitle dangerouslySetInnerHTML={{ __html: t('formT.registerFormTitle') }} />
        <SC.TopFormMessage $message={errors['register']}>{errors['register']}</SC.TopFormMessage>
        <InputComponent
          name="name"
          type="name"
          label={t('formT.nameLabel')}
          placeHolder={t('formT.namePlaceholder')}
          errorMessage={errors['name']}
          onBlur={handleBlur}
          value={name}
          onChange={handleChange}
        />
        <InputComponent
          name="surname"
          type="surname"
          label={t('formT.surnameLabel')}
          placeHolder={t('formT.surnamePlaceholder')}
          errorMessage={errors['surname']}
          onBlur={handleBlur}
          value={surname}
          onChange={handleChange}
        />
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
        <SC.ButtonArea>
          <SC.FormButton type="submit">{t('confirm')}</SC.FormButton>
          <SC.FormButton type="reset" onClick={handleReset}>
            {t('cancel')}
          </SC.FormButton>
        </SC.ButtonArea>
        <p>
          <a href="/login">{t('formT.backLogin')}</a>
        </p>
      </SC.FormContainer>
      {children}
    </SC.ComponentContainer>
  );
};

const RegisterFormWithTranslation = withTranslation()(RegisterFormComponent);

export default RegisterFormWithTranslation;
