import { User, UserRole } from './../types/User';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface IAuthContext {
  user: LoggedUser | null;
  signIn: (username: string, pasword: string) => void;
  signOut: VoidFunction;
}
interface LoggedUser extends User {
  token: string;
}

const userData: LoggedUser = {
  id: '1',
  firstName: 'firstName',
  lastName: 'lastName',
  role: UserRole.Manager,
  isActive: true,
  token: 'test',
};

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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('storedUser', storedUser);

    if (!storedUser) return;
    const parsedUser = JSON.parse(storedUser!);
    setUser(parsedUser);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      // const userData = await axios.post(
      //   'http://localhost:8000/login',
      //   {
      //     username,
      //     password,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
      // const userData = await fetch('http://localhost:8000/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // });
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
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
