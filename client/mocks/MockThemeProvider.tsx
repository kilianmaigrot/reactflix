import React, { ReactNode } from 'react';

interface MockThemeProviderProps {
  children: ReactNode;
}

const MockThemeProvider: React.FC<MockThemeProviderProps> = ({ children }) => (
  <div data-testid='mock-theme-provider'>
    {children}
  </div>
);

export default MockThemeProvider;
