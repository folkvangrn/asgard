import React, { useContext, useEffect, useState } from 'react';
import { User, UserRole } from '@/types/User';

interface IAuthContext {
  user: LoggedUser | null;
  signIn: (username: string, pasword: string) => void;
  signOut: VoidFunction;
}
interface LoggedUser extends User {
  token: string;
}

// const userData: LoggedUser = {
//   id: '1',
//   username: 'test',
//   firstName: 'firstName',
//   lastName: 'lastName',
//   role: UserRole.Admin,
//   token: 'test',
// };

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
    const tok = localStorage.getItem('token');
    console.log(storedUser);
    console.log(tok);
    if (!storedUser) return;
    const parsedUser = JSON.parse(storedUser!);
    setUser(parsedUser);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/login', {
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
      console.error(e);
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
