import React, {
  FC,
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

interface StyleThemeContextProps {
  styleTheme: string | null
  setStyleTheme: Dispatch<SetStateAction<string | null>>
}

export const StyleThemeContext = createContext<StyleThemeContextProps | null>(null);

export const useStyleThemeContext = (): StyleThemeContextProps => {
  const context = useContext(StyleThemeContext);
  if (!context) {
    throw new Error(
      'useStyleThemeContext must be used within a component wrapped with StyleThemeProvider',
    );
  }
  return context;
};

interface StyleThemeProviderProps {
  children: ReactNode
}

export const StyleThemeProvider: FC<StyleThemeProviderProps> = ({ children }) => {
  const storedStyleTheme = JSON.parse(sessionStorage.getItem('styleTheme') || 'null') as
    | string
    | null;
  const [styleTheme, setStyleTheme] = useState<string | null>(storedStyleTheme);

  const contextValue = useMemo(
    () => ({ styleTheme, setStyleTheme }),
    [styleTheme, setStyleTheme],
  );

  useEffect(() => {
    sessionStorage.setItem('styleTheme', JSON.stringify(styleTheme));
  }, [styleTheme]);

  return (
    <StyleThemeContext.Provider value={contextValue}>
      {children}
    </StyleThemeContext.Provider>
  );
};

export default StyleThemeContext;
