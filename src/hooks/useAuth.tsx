import { User } from './../types/User';
import React, { useContext, useState, useEffect, FC } from 'react';
import axios from 'axios';

interface IAuthContext {
  user: LoggedUser | null;
  signIn: (username: string, pasword: string) => void;
  signOut: VoidFunction;
}
interface LoggedUser extends User {
  token: string;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

type AuthProviderProps = {
  children: JSX.Element;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LoggedUser | null>(null);

  const signIn = async (username: string, password: string) => {
    try {
      const userData = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      setUser(await userData.json());
    } catch (e) {
      console.error(e);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
