import React, {
  FC, useState, ChangeEvent, FocusEvent, FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import FormUtils from '../../utils/formUtils';
import useFormValues from '../../hooks/useFormValues';
import { useUserContext } from '../../context/user-context';

const EditPasswordFormComponent: FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [errorTop, setErrorTop] = useState<string>('');
  const { errorMessages, regexPatterns, errorsTop } = FormUtils();

  const { 
    state: inputValues, editValue, editError, restartInputValues,
  } = useFormValues({
    idUser: {
      value: user.idUser,
      error: '',
    },
    oldPassword: {
      value: '',
      error: '',
    },
    newPassword: {
      value: '',
      error: '',
    },
    email: {
      value: user.email,
      error: '',
    },
  });

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
    checkError(inputArea.target.value, regex, 'password', inputArea.target.id);
    editValue({ inputKey: inputArea.target.id, value: inputArea.target.value });
  };

  // Gestion de la soumission du formulaire
  type UserData = {
    idUser: string;
    oldPassword: string;
    newPassword: string;
    email: string;
  };

  const launchPasswordEdit = (userData: UserData) => AxiosS.updatePassword(userData)
    .then(() => 'editOk')
    .catch(() => {
      throw new Error('editWrongPassword');
    });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let problemDetected = false;
    const submitData = { 
      idUser: inputValues.idUser.value,
      email: inputValues.email.value,
      oldPassword: inputValues.oldPassword.value,
      newPassword: inputValues.newPassword.value,
    };    
    Object.entries(submitData).forEach((entry) => {
      const [key, value] = entry;
      editError({ inputKey: key, error: value === '' ? errorMessages.empty : inputValues[key].error });
      problemDetected = (value === '' || inputValues[key].error !== '') && true;
    });
    if (!problemDetected) {
      launchPasswordEdit(submitData) // idUser et mail dans inputValues
        .then((result) => setErrorTop(result))
        .catch(() => setErrorTop('editWrongPassword'));
    }
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
          errorMessage={inputValues.oldPassword.error}
          onBlur={handleBlur}
          value={inputValues.oldPassword.value}
          onChange={handleChange}
        />
        <InputComponent
          name='newPassword'
          type='password'
          label={t('formT.passwordNewLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={inputValues.newPassword.error}
          onBlur={handleBlur}
          value={inputValues.newPassword.value}
          onChange={handleChange}
        />
        <SC.ButtonArea>
          <SC.FormButton type='submit'>{t('confirm')}</SC.FormButton>
          <SC.FormButton type='reset' onClick={restartInputValues}>
            {t('cancel')}
          </SC.FormButton>
        </SC.ButtonArea>
      </SC.FormContainer>
    </SC.ComponentContainerLight>
  );
};

export default EditPasswordFormComponent;
