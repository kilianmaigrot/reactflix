import React, { 
  FC, ReactNode, useState, ChangeEvent, FocusEvent, FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import { 
  errorMessages, regexPatterns, errorsTop,
} from '../../utils/formUtils';

interface RegisterFormComponentProps extends WithTranslation {
  children: ReactNode;
}

const RegisterFormComponent: FC<RegisterFormComponentProps> = ({ children, t }) => {
  const navigate = useNavigate();

  interface ErrorsType {    
    name?: string;  
    surname?: string;
    email?: string;
    password?: string;
  }
  const [errors, setErrors] = useState<ErrorsType>({});
  const [errorTop, setErrorTop] = useState<string>('');

  type UserObject = {
    name: string;
    surname: string;
    email: string;
    password: string;
  };
  const [inputValues, setInputValues] = useState<UserObject>({ 
    name: '', 
    surname: '', 
    email: '', 
    password: '',
  });

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
  const launchRegistration = (userData: UserObject) => AxiosS.register(userData)
    .then((response) => {
      if (response.status === 201) {
        navigate('/login/inscriptionOk');
        return 'inscriptionOk';
      }
      if (response.status === 409) {
        throw new Error('errorExistingUser');
      }
      throw new Error('errorServer');
    })
    .catch(() => { throw new Error('editWrongPassword'); });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.entries(inputValues).forEach((entry) => {
      const [key, value] = entry;
      updateErrors(key, value === '' ? errorMessages.empty : errors[key] as string);
    });
    if (!Object.values(errors).some((value) => value !== '') && inputValues.name !== '' && inputValues.surname !== '' && inputValues.email !== '' && inputValues.password !== '') {
      launchRegistration(inputValues)
        .catch((err) => setErrorTop((err as Error).message));
    }
  };

  // Gestion du reset
  const handleReset = () => {
    setErrors({});
    setInputValues({ 
      name: '', 
      surname: '', 
      email: '', 
      password: '',
    });
  };

  return (
    // Styled compoonents
    <SC.ComponentContainer $side='right'>
      <SC.FormContainer id='registerForm' onSubmit={handleSubmit} acceptCharset='UTF-8'>
        <SC.FormTitle dangerouslySetInnerHTML={{ __html: t('formT.registerFormTitle') }} />
        <SC.TopFormMessage $message={errorTop}>{errorsTop[errorTop]}</SC.TopFormMessage>
        <InputComponent
          name='name'
          type='name'
          label={t('formT.nameLabel')}
          placeHolder={t('formT.namePlaceholder')}
          errorMessage={errors.name}
          onBlur={handleBlur}
          value={inputValues.name}
          onChange={handleChange}
        />
        <InputComponent
          name='surname'
          type='surname'
          label={t('formT.surnameLabel')}
          placeHolder={t('formT.surnamePlaceholder')}
          errorMessage={errors.surname}
          onBlur={handleBlur}
          value={inputValues.surname}
          onChange={handleChange}
        />
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
        <SC.ButtonArea>
          <SC.FormButton type='submit'>{t('confirm')}</SC.FormButton>
          <SC.FormButton type='reset' onClick={handleReset}>
            {t('cancel')}
          </SC.FormButton>
        </SC.ButtonArea>
        <p>
          <a href='/login'>{t('formT.backLogin')}</a>
        </p>
      </SC.FormContainer>
      {children}
    </SC.ComponentContainer>
  );
};

const RegisterFormWithTranslation = withTranslation()(RegisterFormComponent);

export default RegisterFormWithTranslation;
