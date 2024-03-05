import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as SC from './userPage.style';
import EditInfosFormComponent from '../EditInfosForm';
import EditPasswordFormComponent from '../EditPasswordForm';
import { useUserContext } from '../../context/userContext';

const UserPageComponent: FC = () => {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const [displayedForm, setDisplayedForm] = useState<string>('none');
  const {
    name, surname, idUser, email, 
  } = user;
  
  return (
    <SC.ComponentContainer>
      <SC.LeftSideContainer>
        <SC.TextParagraph>
          {t('userMessage', {
            surname,
            name,
            idUser,
            email,
          })}
        </SC.TextParagraph>
        <SC.ButtonArea>
          <SC.FormButton onClick={() => (displayedForm === 'editInfos' ? setDisplayedForm('none') : setDisplayedForm('editInfos'))} aria-label={t('editInfos')}>
            {t('editInfos')}
          </SC.FormButton>
          <SC.FormButton onClick={() => (displayedForm === 'editPassword' ? setDisplayedForm('none') : setDisplayedForm('editPassword'))} aria-label={t('editPassword')}>
            {t('editPassword')}
          </SC.FormButton>
          <SC.FormButton>
            <a href='/logout'>{t('logout')}</a>
          </SC.FormButton>
        </SC.ButtonArea>
      </SC.LeftSideContainer>

      <SC.RightSideContainer $display={displayedForm !== 'none'}>
        <SC.BackButton
          type='button'
          onClick={() => setDisplayedForm('none')}
          tabIndex={0}
          aria-label={t('close')}
        >
          {t('close')}
        </SC.BackButton>
        <SC.FormContainer $display={displayedForm === 'editInfos'}>
          <EditInfosFormComponent />
        </SC.FormContainer>
        <SC.FormContainer $display={displayedForm === 'editPassword'}>
          <EditPasswordFormComponent />
        </SC.FormContainer>
      </SC.RightSideContainer>
    </SC.ComponentContainer>
  );
};

export default UserPageComponent;
