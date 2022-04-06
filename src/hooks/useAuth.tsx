import { User } from './../types/User';
import React, { useContext, useState, useEffect, FC } from 'react';
import axios from 'axios';

interface IAuthContext {
  user?: LoggedUser | null;
  signIn?: (username: string, pasword: string) => void;
  signOut?: () => void;
}

type AuthProviderProps = {
  children: JSX.Element;
};

interface LoggedUser extends User {
  token: string;
}

const AuthContext = React.createContext<IAuthContext>({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LoggedUser | null>(null);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post('localhost:5000/login', {
        username,
        password,
      });
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
