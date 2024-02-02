import { useTranslation } from 'react-i18next';

// Define error messages interface
interface ErrorMessagesProps {
  [key: string]: string;
}

// Define regex patterns interface
interface RegexPatternsProps {
  [key: string]: RegExp;
}

// Define top-level errors interface
interface ErrorsTopProps {
  [key: string]: string;
}

const FormUtilsComponent = () => {
  const { t } = useTranslation(); // Specify the correct namespace here

  // Define error messages
  const errorMessages: ErrorMessagesProps = {
    empty: t('formT.errorMessages.empty'),
    name: t('formT.errorMessages.name'),
    surname: t('formT.errorMessages.surname'),
    email: t('formT.errorMessages.email'),
    password: t('formT.errorMessages.password'),
  };

  // Define top-level errors
  const errorsTop: ErrorsTopProps = {
    errorLogin: t('formT.errorsTop.errorLogin'), // Corrected usage
    errorServer: t('formT.errorsTop.errorServer'), // Corrected usage
    errorExistingUser: t('formT.errorsTop.errorExistingUser'),
    errorToken: t('formT.errorsTop.errorToken'), // Corrected usage
    inscriptionOk: t('formT.errorsTop.inscriptionOk'), // Corrected usage
    editOk: t('formT.errorsTop.editOk'), // Corrected usage
    editWrongPassword: t('formT.errorsTop.editWrongPassword'), // Corrected usage
    editPasswordSuccess: t('formT.errorsTop.editPasswordSuccess'), // Corrected usage
  };

  // Define regex patterns
  const regexPatterns: RegexPatternsProps = {
    name: /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/,
    surname: /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/,
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  };

  // Return the values as an object
  return {
    errorMessages,
    regexPatterns,
    errorsTop,
  };
};

export default FormUtilsComponent;
