import React from 'react';
import { render, screen } from 'root/utils/test-utils';
import IndexWithTranslation from 'root/pages/Index';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import enUkTranslations from 'root/locale/enUk.json';

// Mocking de i18n en utilisant les trads enUk
const tMock = (key: string): string => key;
const config = {
  lng: 'enUk',
  fallbackLng: 'enUk',
  debug: false,
  interpolation: { escapeValue: false },
  resources: {
    enUk: { translation: enUkTranslations }, // Provide the translations to the i18next instance
  },
};
const i18nInstance = i18n.createInstance();
i18nInstance.init(config).then(() => {
}).catch(() => {
});
declare global {
  interface Window {
    t: (key: string) => string;
  }
}
window.t = tMock;

describe('Index Component', () => {
  it('passes translation props correctly', () => {
    render(
      <I18nextProvider i18n={i18nInstance}>
        <IndexWithTranslation />
      </I18nextProvider>,
    );
    const welcomeMessage: HTMLElement | null = screen.getByText(/Welcome to the React Login app/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
