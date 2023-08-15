import axios from '@/lib/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/session/refresh', {
      withCredentials: true,
    });
    console.log(response);

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.data.accessToken };
    });
    return response.data.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
