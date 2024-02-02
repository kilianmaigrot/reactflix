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

export interface User {
  idUser: string;
  name: string;
  surname: string;
  email: string;
  userLanguage: string;
}

export interface UserContextProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextProps>({
  user: {
    idUser: '',
    name: '',
    surname: '',
    email: '',
    userLanguage: '',
  },
  setUser: () => {},
});

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext doit être utilisé dans une app encapsulée par UserProvider');
  }
  return context;
};

export const getUserLanguage = () => {
  const { user } = useContext(UserContext);
  return user?.userLanguage;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem('user') || 'null') as User;
  const [user, setUser] = useState<User | null>(storedUser);
  const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return <UserContext.Provider value={contextValue as UserContextProps}>{children}</UserContext.Provider>;
};

export default UserContext;
