import React, {
  FC, useState, ChangeEvent, FocusEvent, FormEvent,
} from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as AxiosS from '../../services/axios.service';

import InputComponent from '../Input';
import * as SC from './form.style';
import { errorsDefault, errorMessages, regexPatterns, errorsTop } from './utils';
import { useUserContext } from '../../context/user-context';

interface EditPasswordFormComponentProps extends WithTranslation {
}

const EditPasswordFormComponent: FC<EditPasswordFormComponentProps> = ({
  t,
}: EditPasswordFormComponentProps) => {
  const { user } = useUserContext();

  const [errors, setErrors] = useState<object>(errorsDefault);

  const [errorTop, setErrorTop] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

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
    event.target.name === 'oldPassword' ? setOldPassword(event.target.value) : null;
    event.target.name === 'newPassword' ? setNewPassword(event.target.value) : null;
  };

  // Gère le blur d'un inputArea
  const handleBlur = (inputArea: FocusEvent<HTMLInputElement>) => {
    const regex:RegExp = regexPatterns[inputArea.target.name];
    const errorMessage:string = errorMessages[inputArea.target.name];
    checkError(inputArea.target.value, regex, errorMessage, inputArea.target.name);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({
      oldPassword: oldPassword === '' ? errorMessages.empty : errors['oldPassword'],
      newPassword: newPassword === '' ? errorMessages.empty : errors['newPassword'],
    });

    if (
      !Object.values(errors).some((value) => value !== '')
      && oldPassword !== ''
      && newPassword !== ''
    ) {
      const postData = {
        idUser: user.idUser,
        email: user.email,
        oldPassword,
        newPassword,
      };
      try {
        const response = await AxiosS.updatePassword(postData);
        setErrorTop(response.message);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Gestion du reset
  const handleReset = () => {
    setErrors(errorsDefault);
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <SC.ComponentContainerLight>
      <SC.FormContainer id="editPasswordForm" onSubmit={handleSubmit} acceptCharset="UTF-8">
        <SC.FormTitle dangerouslySetInnerHTML={{ __html: t('formT.editPasswordFormTitle') }} />
        <SC.TopFormMessage $message={errorTop}>{errorsTop[errorTop]}</SC.TopFormMessage>
        <InputComponent
          name="oldPassword"
          type="password"
          label={t('formT.passwordOldLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={errors['oldPassword']}
          onBlur={handleBlur}
          value={oldPassword}
          onChange={handleChange}
        />
        <InputComponent
          name="newPassword"
          type="password"
          label={t('formT.passwordNewLabel')}
          placeHolder={t('formT.passwordPlaceholder')}
          errorMessage={errors['newPassword']}
          onBlur={handleBlur}
          value={newPassword}
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

const EditPasswordFormWithTranslation = withTranslation()(EditPasswordFormComponent);

export default EditPasswordFormWithTranslation;
