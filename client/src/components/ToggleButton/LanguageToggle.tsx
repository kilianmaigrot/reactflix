import React, { FC, useState } from 'react';
import * as AxiosS from '../../services/axios.service';
import * as SC from './toggleButton.style';
import DrapeauFR from './img/DrapeauFR.jpg';
import DrapeauUK from './img/DrapeauUK.jpg';
import { useUserContext } from '../../context/user-context';

interface LanguageToggleButtonProps {
  toggled: boolean;
}

const LanguageToggleButton: FC<LanguageToggleButtonProps> = ({ toggled }) => {
  const { user, setUser } = useUserContext();

  const [isToggled, toggle] = useState<boolean>(toggled);

  interface PostDataType {
    userLanguage: string;
    idUser: string;
  }

  const setLanguagesParameters = async (userLanguageSet: string, idUserSet: string) => {
    const postData: PostDataType = {
      userLanguage: userLanguageSet,
      idUser: idUserSet,
    };

    postData.idUser !== '' && (await AxiosS.updateLanguage(postData));

    setUser((prevUser) => ({
      ...prevUser,
      userLanguage: postData.userLanguage,
    }));
  };

  const callback = () => {
    toggle(!isToggled);
    setLanguagesParameters(isToggled ? 'frFr' : 'enUk', user?.idUser || '').catch(() => {});
  };

  return (
    <SC.ToggleContainer>
      <SC.IconFlag src={DrapeauFR as string} alt='Drapeau FR' />
      <SC.ToggleLabel>
        <SC.ToggleInput type='checkbox' defaultChecked={isToggled} onClick={callback} />
        <SC.ToggleSpan />
      </SC.ToggleLabel>
      <SC.IconFlag src={DrapeauUK as string} alt='Drapeau UK' />
    </SC.ToggleContainer>
  );
};

export default LanguageToggleButton;
