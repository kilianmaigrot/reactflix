import React, {
  FC,
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useMemo
} from 'react';

interface User {
  idUser: string | null // Make idUser optional by adding a question mark
  name: string
  surname: string
  email: string
  userLanguage: string
}

interface UserContextProps {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextProps | null>(null);

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext doit être utilisé dans une app encapsulée par UserProvider');
  }
  return context;
};

export const getUserLanguage = () => {
  const { user } = useUserContext(); // Ensure useUserContext is available in this file
  return user?.userLanguage;
};

interface UserProviderProps {
  children: ReactNode
}



export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem('user') || 'null') as User | null;
  const [user, setUser] = useState<User | null>(storedUser);
  const contextValue = useMemo(
    () => ({ user, setUser }),
    [user, setUser]
  );

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserContext;
