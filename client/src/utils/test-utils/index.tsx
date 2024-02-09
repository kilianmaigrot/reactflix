import React, { ReactElement, StrictMode, useMemo } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import setUser, { UserContext } from 'root/context/userContext';
import setStyleTheme, { StyleThemeContext } from 'root/context/styleContext';
import { BrowserRouter } from 'react-router-dom';

const userData = {
  idUser: '1',
  name: 'Maigrot',
  surname: 'Kilian',
  email: 'kilian.maigrot@gmail.com',
  userLanguage: 'frFr',
};

const styleTheme = 'dark-mode';

const getUserContextValue = () => {
  const contextValue = useMemo(() => ({ user: userData, setUser: () => {} }), [userData, setUser]);
  return contextValue;
};

const getStyleContextValue = () => {
  const contextValue = useMemo(() => ({ styleTheme, setStyleTheme: () => {} }), [styleTheme, setStyleTheme]);
  return contextValue;
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <StrictMode>
    <UserContext.Provider value={getUserContextValue()}>
      <StyleThemeContext.Provider value={getStyleContextValue()}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </StyleThemeContext.Provider>
    </UserContext.Provider>
  </StrictMode>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
