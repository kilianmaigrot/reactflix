import bgLight from './img/LightBackground.jpg';
import bgDark from './img/DarkBackground.jpg';

export interface Theme {
  background: string
  top: string
  bgImage: string
  fontFamily: string
}

const commonProperties = {
  fontFamily: '"Montserrat", sans-serif',
};

export const lightTheme: Theme = {
  ...commonProperties,
  background: '#282b2e',
  top: '#cccccc',
  bgImage: bgLight as string,
};

export const darkTheme: Theme = {
  ...commonProperties,
  background: '#ffffff',
  top: '#282b2e',
  bgImage: bgDark as string,
};
