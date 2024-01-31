import React, { FC, useState } from 'react';
import * as SC from './toggleButton.style';
import DarkModeIcon from './img/DarkModeIcon.png';
import LightModeIcon from './img/LightModeIcon.png';
import { useStyleThemeContext } from '../../context/style-context';

interface DarkmodeToggleButtonProps {
  toggled: boolean
}

const DarkmodeToggleButton: FC<DarkmodeToggleButtonProps> = ({ toggled }) => {
  const { setStyleTheme } = useStyleThemeContext();

  const [isToggled, toggle] = useState<boolean>(toggled);

  const callback = () => {
    toggle(!isToggled);
    setStyleTheme(isToggled ? 'light-mode' : 'dark-mode');
  };

  return (
    <SC.ToggleContainer>
      <SC.IconLightmode $darkmode={isToggled} src={LightModeIcon} alt="Light Mode Icon" />
      <SC.ToggleLabel>
        <SC.ToggleInput type="checkbox" defaultChecked={isToggled} onClick={callback} />
        <SC.ToggleSpan />
      </SC.ToggleLabel>
      <SC.IconLightmode $darkmode={isToggled} src={DarkModeIcon} alt="Dark Mode Icon" />
    </SC.ToggleContainer>
  );
};

export default DarkmodeToggleButton;
