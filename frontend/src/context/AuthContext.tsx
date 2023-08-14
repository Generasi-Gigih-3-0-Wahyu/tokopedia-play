import { PropsWithChildren, createContext, useState } from 'react';

type UserAuth = {
  _id: string;
  name: string;
  email: string;
};

type Auth = {
  user: UserAuth;
  accessToken: string;
};

type AuthContextType = {
  auth: Auth;
  setAuth: (auth: Auth) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState<AuthContextType['auth']>({
    user: { _id: '', name: '', email: '' },
    accessToken: '',
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
