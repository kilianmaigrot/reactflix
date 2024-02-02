import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as SC from './userPage.style';
import EditInfosFormComponent from '../EditInfosForm';
import EditPasswordFormComponent from '../EditPasswordForm';

interface UserPageComponentProps {
  name: string;
  surname: string;
  email: string;
  idUser: string;
}

const UserPageComponent: FC<UserPageComponentProps> = ({
  name,
  surname,
  email,
  idUser,
}: UserPageComponentProps) => {
  const { t } = useTranslation();
  const [displayedForm, setDisplayedForm] = useState<string>('none');  
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
          <SC.FormButton onClick={() => setDisplayedForm('editInfos')}>
            {t('editInfos')}
          </SC.FormButton>
          <SC.FormButton onClick={() => setDisplayedForm('editPassword')}>
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
