import { Auth } from '@/@types';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

type AuthContextType = {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
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
