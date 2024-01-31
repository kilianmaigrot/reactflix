import React from 'react';
import PageFooter from './footer.style';
import { DarkmodeToggleButton, LanguageToggleButton } from '../ToggleButton';
import { useStyleThemeContext } from '../../context/style-context';
import { useUserContext } from '../../context/user-context';

interface FooterComponentProps {}

const FooterPageComponent: React.FC<FooterComponentProps> = () => {
  const { styleTheme } = useStyleThemeContext();
  const { user } = useUserContext();

  const isDarkmodeToggled = styleTheme === 'dark-mode';
  const isLanguageToggled = user?.userLanguage === 'enUk';

  return (
    <PageFooter>
      <DarkmodeToggleButton toggled={isDarkmodeToggled} />
      <LanguageToggleButton toggled={isLanguageToggled} />
    </PageFooter>
  );
};

export default FooterPageComponent;
