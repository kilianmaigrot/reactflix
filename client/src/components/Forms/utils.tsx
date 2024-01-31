import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

// Messages d'erreur traduits avec 18n
interface errorMessagesProps {
  empty: string,
  name: string,
  surname: string,
  email: string,
  password: string,
}
export const errorMessages: errorMessagesProps =  {
  empty: t('errorMessages.empty'),
  name: t('errorMessages.name'),
  surname: t('errorMessages.surname'),
  email: t('errorMessages.email'),
  password: t('errorMessages.password'),
};

// Regex de chaque champ
interface regexPatternsProps {
  name: RegExp,
  surname: RegExp,
  email: RegExp,
  password: RegExp,
}
export const regexPatterns: regexPatternsProps = {
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/,
  surname: /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
};

// Messages affichés en haut
interface errorsTopProps {
  errorLogin: string,
  errorServer: string,
  errorToken: string,
  inscriptionOk: string,
  editOk: string,
  editWrongPassword: string,
  editPasswordSuccess: string,
}
export const errorsTop : errorsTopProps = {
  errorLogin: t('errorsTop.errorLogin'),
  errorServer: t('errorsTop.errorServer'),
  errorToken: t('errorsTop.errorToken'),
  inscriptionOk: t('errorsTop.inscriptionOk'),
  editOk: t('errorsTop.editOk'),
  editWrongPassword: t('errorsTop.editWrongPassword'),
  editPasswordSuccess: t('errorsTop.editPasswordSuccess'),
};

// Objet errorsDefault
export const errorsDefault = {
  name: '',
  surname: '',
  email: '',
  password: '',
  register: '',
};
