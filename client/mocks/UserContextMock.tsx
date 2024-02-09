import { useMemo, FC } from 'react';
import { UserContext, UserContextProps as OriginalUserContextProps } from 'root/context/userContext';

interface CustomSetUserFunction {
  setUser?: () => void;
}

type ExtendedUserContextProps = OriginalUserContextProps & CustomSetUserFunction;

const defaultSetUser = () => {};

const getUserContextValue = (dataIn: OriginalUserContextProps['user'] | null, setUserFn?: () => void): ExtendedUserContextProps => {
  const propsFromOriginalUserContext: Pick<ExtendedUserContextProps, Exclude<keyof ExtendedUserContextProps, keyof CustomSetUserFunction>> = {
    ...{ user: dataIn },
  };

  return useMemo(() => ({
    ...propsFromOriginalUserContext,
    setUser: setUserFn || defaultSetUser,
  }), [dataIn, setUserFn]);
};

export default getUserContextValue;
