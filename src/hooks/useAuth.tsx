import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { User } from '@/types/User';
//import 'react-scripts';

interface IAuthContext {
  user: User | null;
  signIn: (username: string, pasword: string) => void;
  signOut: VoidFunction;
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      const parsedUser = JSON.parse(storedUser!);
      setUser(parsedUser);
    } catch (e) {
      signOut();
    }
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const request_url = "http://localhost:8000/login";
      const response = await fetch(request_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
    } catch (e) {
      toast('Your password or username is incorrect.', { type: 'error' });
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
