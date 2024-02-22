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
    errorLogin: t('formT.errorsTop.errorLogin'),
    errorServer: t('formT.errorsTop.errorServer'),
    errorAPILimiting: t('formT.errorsTop.errorAPILimiting'),
    errorExistingUser: t('formT.errorsTop.errorExistingUser'),
    errorToken: t('formT.errorsTop.errorToken'),
    inscriptionOk: t('formT.errorsTop.inscriptionOk'),
    editOk: t('formT.errorsTop.editOk'),
    editWrongPassword: t('formT.errorsTop.editWrongPassword'),
    editPasswordSuccess: t('formT.errorsTop.editPasswordSuccess'),
  };

  // Define regex patterns
  const regexPatterns: RegexPatternsProps = {
    name: /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/,
    surname: /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/,
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    oldPassword: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    newPassword: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  };

  // Return the values as an object
  return {
    errorMessages,
    regexPatterns,
    errorsTop,
  };
};

export default FormUtilsComponent;
