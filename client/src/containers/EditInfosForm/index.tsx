import React, { 
  FC, useState, ChangeEvent, FocusEvent, FormEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';
import { useUserContext } from '../../context/user-context';

import InputComponent from '../../components/Input';
import * as SC from './form.style';
import FormUtils from '../../utils/formUtils';
import useFormValues from '../../hooks/useFormValues';

const EditInfosFormComponent: FC = () => {
  const { t } = useTranslation();
  const { user, setUser } = useUserContext();

  const { 
    state: inputValues, editValue, editError, restartInputValues,
  } = useFormValues({
    idUser: {
      value: user.idUser,
      error: '',
    },
    name: {
      value: user.name,
      error: '',
    },
    surname: {
      value: user.surname,
      error: '',
    },
    email: {
      value: user.email,
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
    editValue({ inputKey: event.target.name, value: event.target.value });
  };

  // Gère le blur d'un inputArea
  const handleBlur = (inputArea: FocusEvent<HTMLInputElement>) => {
    const regex: RegExp = regexPatterns[inputArea.target.name];
    checkError(inputArea.target.value, regex, inputArea.target.name, inputArea.target.name);
    editValue({ inputKey: inputArea.target.name, value: inputArea.target.value });
  };

  // Gestion de la soumission du formulaire
  type UserObject = {
    idUser: string;
    name: string;
    surname: string;
    email: string;
    password: string;
  };
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
    .catch(() => {
      throw new Error('editWrongPassword');
    });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let problemDetected = false;
    const submitData = { 
      idUser: inputValues.idUser.value,
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
      launchEdit(submitData)
        .then((result) => setErrorTop(result))
        .catch(() => setErrorTop('editWrongPassword'));
    }
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
          errorMessage={inputValues.name.error}
          onBlur={handleBlur}
          value={inputValues.name.value}
          onChange={handleChange}
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

export default EditInfosFormComponent;
