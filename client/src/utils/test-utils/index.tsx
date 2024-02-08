import React, { ReactElement, StrictMode, useMemo } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import setUser, { UserContext } from 'root/context/user-context';
import { StyleThemeProvider } from 'root/context/style-context';
import { BrowserRouter } from 'react-router-dom';

const userData = {
  idUser: '1',
  name: 'Maigrot',
  surname: 'Kilian',
  email: 'kilian.maigrot@gmail.com',
  userLanguage: 'frFr',
};

const getContextValue = () => {
  const contextValue = (useMemo(() => ({ user: userData, setUser: () => {} }), [userData, setUser]));
  return contextValue;
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <StrictMode>
    <UserContext.Provider value={getContextValue()}>
      <StyleThemeProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </StyleThemeProvider>
    </UserContext.Provider>
  </StrictMode>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
