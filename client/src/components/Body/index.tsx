import React, { ReactNode, FC, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import * as SC from './body.style';
import { lightTheme, darkTheme } from '../../themes/Theme';
import { useStyleThemeContext } from '../../context/style-context';
import { useUserContext } from '../../context/user-context';

import i18n from '../../locale/i18n';

interface BodyComponentProps {
  pageName: string;
  children: ReactNode;
}

const BodyPageComponent: FC<BodyComponentProps> = ({ children, pageName }: BodyComponentProps) => {
  const { styleTheme } = useStyleThemeContext();
  const { user } = useUserContext();

  const currentTheme = styleTheme === 'light-mode' ? lightTheme : darkTheme;

  useEffect(() => {
    const changeLanguage = async () => {
      try {
        const userLanguage = user?.userLanguage || 'frFr';
        await i18n.changeLanguage(userLanguage);
      } catch (error) {
        // console.error('Error changing language:', error);
      }
    };

    changeLanguage().catch((err) => console.error('Error changing language:', err));
  }, [user]);

  useEffect(() => {
    document.title = pageName;
  }, [pageName]);

  return (
    <ThemeProvider theme={currentTheme}>
      <I18nextProvider i18n={i18n}>
        <SC.PageBody>{children}</SC.PageBody>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default BodyPageComponent;
