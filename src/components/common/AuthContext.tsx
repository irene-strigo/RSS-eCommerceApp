import React, { createContext, useContext, useState } from 'react';

import GetAnonymousToken from '../../../requests/GetAnonymousToken';
import { GetAccessAndRefreshToken, SignInCustomer, SignUpCustomer } from '../../../requests';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

type LogInProps = {
  email: string;
  password: string;
  anonymousCart: {
    id: string;
    typeId: string;
  } | null;
};

type SignInProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type AuthContextProviderProps = {
  userId: string | null;
  logIn: ({ email, password, anonymousCart }: LogInProps) => Promise<unknown>;
  signUp: ({ email, password, firstName, lastName }: SignInProps) => Promise<unknown>;
  logOut: () => void;
  setUserId: (id: string) => void;
};

const User = createContext<AuthContextProviderProps>({
  userId: null,
  logIn: () => Promise.reject(),
  signUp: () => Promise.reject(),
  logOut: () => {},
  setUserId: () => '',
});

const AuthContextProvider = ({ children }: Props) => {
  const [isUserAuth, setIsUserAuth] = useState<string>(
    JSON.parse(localStorage.getItem('customerId') || 'null'),
  );

  if (!isUserAuth) GetAnonymousToken();

  const handleLogIn = async ({ email, password, anonymousCart }: LogInProps) => {
    let logIn = null;
    try {
      logIn = await SignInCustomer({
        email,
        password,
        anonymousCart,
        setIsUserAuth,
      });
    } catch (error) {
      throw new Error((error as Error)?.message || 'Unexpected error occurred');
    }

    const token = await GetAccessAndRefreshToken({
      email,
      password,
    });

    return {
      logIn,
      token,
    };
  };

  const handleSignUp = async ({ email, password, firstName, lastName }: SignInProps) => {
    let signIn = null;
    try {
      signIn = await SignUpCustomer({
        email,
        password,
        firstName,
        lastName,
        setIsUserAuth,
      });
    } catch (error) {
      throw new Error((error as Error)?.message || 'Unexpected error occurred');
    }

    const token = await GetAccessAndRefreshToken({ email, password });

    return {
      signIn,
      token,
    };
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('customerId');
  };

  return (
    <User.Provider
      value={{
        userId: isUserAuth,
        logIn: handleLogIn,
        signUp: handleSignUp,
        logOut: handleSignOut,
        setUserId: setIsUserAuth,
      }}
    >
      {children}
    </User.Provider>
  );
};

export const useUser = () => useContext<AuthContextProviderProps>(User);

export default AuthContextProvider;
