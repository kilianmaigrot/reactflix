import React, {
  FC, useState, ChangeEvent, FocusEvent, FormEvent,
} from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';
import { useUserContext } from '../../context/user-context';

import InputComponent from '../Input';
import * as SC from './form.style';
import { errorsDefault, errorMessages, regexPatterns, errorsTop } from './utils';

interface EditInfosFormComponentProps extends WithTranslation {
}

const EditInfosFormComponent: FC<EditInfosFormComponentProps> = ({ t }) => {
  const { user, setUser } = useUserContext();

  const [errors, setErrors] = useState<object>(errorsDefault);
  const [errorTop, setErrorTop] = useState<string>('');
  const [idUser] = useState<string>(user.idUser);
  const [name, setName] = useState<string>(user.name);
  const [surname, setSurname] = useState<string>(user.surname);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('');

  // Vérifie une value si vide et avec un regex, et modifie les erreurs en conséquence
  const checkError = (value: string, regex: RegExp, errorMessage: string, errorName: string) => {
    const emptyError: string = value === '' ? errorMessages.empty : '';
    const regexError : string = regex && !regex.test(value) ? errorMessage : '';
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
  type EditResponse = 'editOk' | 'editWrongPassword';
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setErrors({
      name: name === '' ? errorMessages.empty : errors['name'],
      surname: surname === '' ? errorMessages.empty : errors['surname'],
      email: email === '' ? errorMessages.empty : errors['email'],
      password: password === '' ? errorMessages.empty : errors['password'],
    });
    
    if (
      !Object.values(errors).some((value) => value !== '')
      && name !== ''
      && surname !== ''
      && email !== ''
      && password !== ''
      ) {
        launchEdit(idUser, name, surname, email, password)
        .then((result) => setErrorTop(result))
        .catch(() => setErrorTop('editWrongPassword'));
      }
    };
    
    const launchEdit = (idUser: string, name: string, surname: string, email: string, password: string) => {
      const formData = {
        idUser,
        name,
        surname,
        email,
        password
      };
      
      return AxiosS.updateUser(formData)
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          idUser,
          name,
          surname,
          email,
        }));
        
        return 'editOk' as EditResponse;
      })
      .catch((error) => {
        console.error('Failed to edit user details: ', error);
        throw new Error('editWrongPassword');
      });
    };

  // Gestion du reset
  const handleReset = () => {
    setErrors(errorsDefault);
    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setPassword('');
  };

  return (
    <SC.ComponentContainerLight>
      <SC.FormContainer id="editInfosForm" onSubmit={handleSubmit} acceptCharset="UTF-8">
        <SC.FormTitle>{t('formT.editInfosFormTitle')}</SC.FormTitle>
        <SC.TopFormMessage $message={errorTop}>{errorsTop[errorTop]}</SC.TopFormMessage>
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
      </SC.FormContainer>
    </SC.ComponentContainerLight>
  );
};

const EditInfosFormWithTranslation = withTranslation()(EditInfosFormComponent);

export default EditInfosFormWithTranslation;
