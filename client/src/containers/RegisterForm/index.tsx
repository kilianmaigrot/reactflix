import React, {
  FC, ReactNode, useState, ChangeEvent, FocusEvent, FormEvent, 
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import FormUtils from '../../utils/formUtils';
import useFormValues from '../../hooks/useFormValues';

interface RegisterFormComponentProps {
  children: ReactNode;
}

const RegisterFormComponent: FC<RegisterFormComponentProps> = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { 
    state: inputValues, editValue, editError, restartInputValues,
  } = useFormValues({
    name: {
      value: '',
      error: '',
    },
    surname: {
      value: '',
      error: '',
    },
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
  const [errorTop, setErrorTop] = useState<string>('');

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
  type UserObject = {
    name: string;
    surname: string;
    email: string;
    password: string;
  };

  const launchRegistration = (userData: UserObject) => AxiosS.register(userData)
    .then((response) => {
      if (response.status === 201) {
        navigate('/login/inscriptionOk');
        return 'inscriptionOk';
      }
      throw new Error('errorServer');
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 409) {
        throw new Error('errorExistingUser');
      }
      throw new Error('errorServer');
    });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let problemDetected = false;
    const submitData = { 
      name: inputValues.name.value,
      surname: inputValues.surname.value,
      email: inputValues.email.value,
      password: inputValues.password.value,
    };
    Object.entries(submitData).forEach((entry) => {
      const [key, value] = entry;
      editError({ inputKey: key, error: value === '' ? errorMessages.empty : inputValues[key].error });
      problemDetected = (value === '' || inputValues[key].error !== '') && true;
    });
    if (!problemDetected) {
      launchRegistration(submitData).catch((err) => setErrorTop((err as Error).message));
    }
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
          errorMessage={inputValues.name.error}
          onBlur={handleBlur}
          value={inputValues.name.value}
          onChange={handleChange}          
          autoComplete='family-name'
        />
        <InputComponent
          name='surname'
          type='surname'
          label={t('formT.surnameLabel')}
          placeHolder={t('formT.surnamePlaceholder')}
          errorMessage={inputValues.surname.error}
          onBlur={handleBlur}
          value={inputValues.surname.value}
          onChange={handleChange}
          autoComplete='given-name'
        />
        <InputComponent
          name='email'
          type='email'
          label={t('formT.emailLabel')}
          placeHolder={t('formT.emailPlaceholder')}
          errorMessage={inputValues.email.error}
          onBlur={handleBlur}
          value={inputValues.email.value}
          onChange={handleChange}
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
          autoComplete='new-password'
        />
        <SC.ButtonArea>
          <SC.FormButton type='submit'>{t('confirm')}</SC.FormButton>
          <SC.FormButton type='reset' onClick={restartInputValues}>
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

export default RegisterFormComponent;
