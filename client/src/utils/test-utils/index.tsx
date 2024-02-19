import React, { StrictMode, useMemo, PropsWithChildren } from 'react';
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

type GetUserContextValueType = ReturnType<typeof getUserContextValue>;
type GetStyleContextValueType = ReturnType<typeof getStyleContextValue>;

type ProviderProps = {
  userContextValue?: GetUserContextValueType;
  styleContextValue?: GetStyleContextValueType;
};

const AllTheProviders = ({ children, userContextValue, styleContextValue }: PropsWithChildren<ProviderProps>) => (
  <StrictMode>
    <UserContext.Provider value={userContextValue || getUserContextValue()}>
      <StyleThemeContext.Provider value={styleContextValue || getStyleContextValue()}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </StyleThemeContext.Provider>
    </UserContext.Provider>
  </StrictMode>
);

interface CustomRenderProps extends Omit<RenderOptions, 'wrapper'> {
  userContextValue?: GetUserContextValueType;
}

const customRender = (
  ui: React.ReactElement,
  { userContextValue, ...options }: CustomRenderProps = {},
): void => {
  render(ui, {
    wrapper: (props: JSX.IntrinsicElements['div']) => (
      <AllTheProviders userContextValue={userContextValue} styleContextValue={getStyleContextValue()}>
        {props.children}
      </AllTheProviders>
    ),
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
