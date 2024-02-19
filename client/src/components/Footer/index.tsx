import React from 'react';
import PageFooter from './footer.style';
import { DarkmodeToggleButton, LanguageToggleButton } from '../ToggleButton';
import { useStyleThemeContext } from '../../context/styleContext';
import { useUserContext } from '../../context/userContext';

interface FooterComponentProps {}

const FooterPageComponent: React.FC<FooterComponentProps> = () => {
  const { styleTheme } = useStyleThemeContext();
  const { user } = useUserContext();

  const isDarkmodeToggled = styleTheme === 'light-mode';
  const isLanguageToggled = user?.userLanguage === 'enUk';

  return (
    <PageFooter>
      <DarkmodeToggleButton toggled={isDarkmodeToggled} />
      <LanguageToggleButton toggled={isLanguageToggled} />
    </PageFooter>
  );
};

export default FooterPageComponent;
