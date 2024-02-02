import React, { 
  FC, useState, ChangeEvent, FocusEvent, FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import FormUtils from '../../utils/formUtils';
import { useUserContext } from '../../context/user-context';

const EditPasswordFormComponent: FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();

  interface ErrorsType {  
    [key: string]: string;
  }
  const { errorMessages, regexPatterns, errorsTop } = FormUtils(); 
  const [errors, setErrors] = useState<ErrorsType>({});

  const [errorTop, setErrorTop] = useState<string>('');

  type ValuesTyping = {
    idUser: string,
    email: string, 
    oldPassword: string;
    newPassword: string;
  };
  const [inputValues, setInputValues] = useState<ValuesTyping>({ 
    idUser: user.idUser, // idUser gardé pour faciliter les requêtes à l'envoi
    email: user.email, // email gardé pour faciliter les requêtes à l'envoi
    oldPassword: '', 
    newPassword: '', 
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
    const regex: RegExp = regexPatterns[inputArea.target.type];    
    checkError(inputArea.target.value, regex, inputArea.target.type, inputArea.target.name);
    updateInputValues(inputArea.target.name, inputArea.target.value);
  };

  // Gestion de la soumission du formulaire
  const launchPasswordEdit = (userData : ValuesTyping) => AxiosS.updatePassword(userData)
    .then(() => ('editOk'))
    .catch(() => { throw new Error('editWrongPassword'); });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.entries(inputValues).forEach((entry) => {
      const [key, value] = entry;
      updateErrors(key, value === '' ? errorMessages.empty : errors[key]);
    });
    if (!Object.values(errors).some((value) => value !== '') && inputValues.oldPassword !== '' && inputValues.newPassword !== '') {
      launchPasswordEdit(inputValues) // idUser et mail dans inputValues
        .then((result) => setErrorTop(result))
        .catch(() => setErrorTop('editWrongPassword'));
    }
  };

  // Gestion du reset
  const handleReset = () => {
    setErrors({});
    setInputValues({ 
      idUser: user.idUser,
      email: user.email,
      oldPassword: '', 
      newPassword: '', 
    });
  };

  return (
    <SC.ComponentContainerLight>
      <SC.FormContainer id='editPasswordForm' onSubmit={handleSubmit} acceptCharset='UTF-8'>
        <SC.FormTitle dangerouslySetInnerHTML={{ __html: t('formT.editPasswordFormTitle') }} />
        <SC.TopFormMessage $message={errorTop}>{errorsTop[errorTop]}</SC.TopFormMessage>
        <InputComponent
          name='oldPassword'
          type='password'
          label={t('formT.passwordOldLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={errors.oldPassword}
          onBlur={handleBlur}
          value={inputValues.oldPassword}
          onChange={handleChange}
        />
        <InputComponent
          name='newPassword'
          type='password'
          label={t('formT.passwordNewLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={errors.newPassword}
          onBlur={handleBlur}
          value={inputValues.newPassword}
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

export default EditPasswordFormComponent;
