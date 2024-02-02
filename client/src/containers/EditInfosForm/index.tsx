import React, {
  FC, useState, ChangeEvent, FocusEvent, FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';
import { useUserContext } from '../../context/user-context';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import FormUtils from '../../utils/formUtils';

const EditInfosFormComponent: FC = () => {
  const { t } = useTranslation();
  const { user, setUser } = useUserContext(); 

  interface ErrorsType {
    [key: string]: string;
  }
  const { errorMessages, regexPatterns, errorsTop } = FormUtils(); 
  const [errors, setErrors] = useState<ErrorsType>({});
  const [errorTop, setErrorTop] = useState<string>('');

  type UserObject = {
    idUser: string;
    name: string;
    surname: string;
    email: string;
    password: string;
  };
  
  const [inputValues, setInputValues] = useState<UserObject>({
    idUser: user?.idUser,
    name: user?.name,
    surname: user?.surname,
    email: user?.email,
    password: '',
  });

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
  const launchEdit = (userData: UserObject) => AxiosS.updateUser(userData)
    .then(() => {
      setUser((prevUser) => ({
        ...prevUser,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
      }));
      return 'editOk';
    })
    .catch(() => { throw new Error('editWrongPassword'); });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.entries(inputValues).forEach((entry) => {
      const [key, value] = entry;
      updateErrors(key, value === '' ? errorMessages.empty : errors[key]);
    });
    if (!Object.values(errors).some((value) => value !== '') && inputValues.name !== '' && inputValues.surname !== '' && inputValues.email !== '' && inputValues.password !== '') {
      launchEdit(inputValues)
        .then((result) => setErrorTop(result))
        .catch(() => setErrorTop('editWrongPassword'));
    }
  };

  // Gestion du reset
  const handleReset = () => {
    setErrors({
      name: '',
      surname: '',
      email: '',
      password: '',
    });
    setInputValues({
      idUser: user.idUser,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: '',
    });
  };

  return (
    <SC.ComponentContainerLight>
      <SC.FormContainer id='editInfosForm' onSubmit={handleSubmit} acceptCharset='UTF-8'>
        <SC.FormTitle>{t('formT.editInfosFormTitle')}</SC.FormTitle>
        <SC.TopFormMessage $message={errorTop}>{errorsTop[errorTop]}</SC.TopFormMessage>
        <InputComponent
          name='name'
          type='name'
          label={t('formT.nameLabel')}
          placeHolder={t('formT.namePlaceholder')}
          errorMessage={errors.name?.toString() || ''}
          onBlur={handleBlur}
          value={inputValues.name}
          onChange={handleChange}
        />
        <InputComponent
          name='surname'
          type='surname'
          label={t('formT.surnameLabel')}
          placeHolder={t('formT.surnamePlaceholder')}
          errorMessage={errors.surname?.toString() || ''}
          onBlur={handleBlur}
          value={inputValues.surname}
          onChange={handleChange}
        />
        <InputComponent
          name='email'
          type='email'
          label={t('formT.emailLabel')}
          placeHolder={t('formT.emailPlaceholder')}
          errorMessage={errors.email?.toString() || ''}
          onBlur={handleBlur}
          value={inputValues.email}
          onChange={handleChange}
        />
        <InputComponent
          name='password'
          type='password'
          label={t('formT.passwordLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={errors.password?.toString() || ''}
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
      </SC.FormContainer>
    </SC.ComponentContainerLight>
  );
};

export default EditInfosFormComponent;
