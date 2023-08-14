import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  useDebugValue(context, (context) => (context?.auth ? 'Logged In' : 'Logged Out'));

  if (!context) {
    throw new Error('useAuthContext must be used inside the ThemeProvider');
  }
  return context;
};

export default useAuth;
