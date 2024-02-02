import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import enUk from './enUk.json';
import frFr from './frFr.json';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    resources: {
      enUk: { translation: enUk },
      frFr: { translation: frFr },
    },
    lng: 'frFr',
    fallbackLng: 'frFr',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    react: {
      useSuspense: true,
    },
  })
  .catch(() => {});
async () => {
  await i18n.loadNamespaces(['translation']);
};

export default i18n;
