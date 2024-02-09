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
  styleTheme: string;
  setStyleTheme: Dispatch<SetStateAction<string>>
}

export const StyleThemeContext = createContext<StyleThemeContextProps>({
  styleTheme: 'dark-mode',
  setStyleTheme: () => {},
});

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
    <StyleThemeContext.Provider value={contextValue as StyleThemeContextProps}>
      {children}
    </StyleThemeContext.Provider>
  );
};

export default StyleThemeContext;
