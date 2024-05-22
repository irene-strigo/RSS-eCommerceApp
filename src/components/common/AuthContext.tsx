import React, { createContext, useContext, useEffect, useState } from 'react';
import { GetMe } from '../../services/Client';
import { Customer } from '@commercetools/platform-sdk';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

type AuthContextProviderProps = {
  checkingAuth: boolean;
  hasAuth: boolean;
  customer: Customer | null;
  logOut: () => void;
  refresh: () => Promise<void>;
};

const User = createContext<AuthContextProviderProps>({
  checkingAuth: true,
  hasAuth: false,
  customer: null,
  logOut: () => Promise.reject(),
  refresh: () => Promise.reject(),
});

const AuthContextProvider = ({ children }: Props) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isUserAuth, setIsUserAuth] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const getMe = async () => {
    setIsCheckingAuth(true);
    setIsUserAuth(false);
    try {
      const me = await GetMe();
      if (me && me.id) {
        setIsUserAuth(true);
        setCustomer(me);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('PersonalToken');
    await getMe();
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <User.Provider
      value={{
        checkingAuth: isCheckingAuth,
        hasAuth: isUserAuth,
        customer: customer,
        logOut: logout,
        refresh: getMe,
      }}
    >
      {children}
    </User.Provider>
  );
};

export const useUser = () => useContext<AuthContextProviderProps>(User);

export default AuthContextProvider;
