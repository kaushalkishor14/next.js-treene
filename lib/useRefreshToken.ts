import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyRefreshTokenQuery } from '@/lib/features/Auth/api'; // Adjust the path according to your project structure
import { setCredentials } from '@/lib/features/Auth/authSlice';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const [getRefreshToken, { data, error, isLoading }] = useLazyRefreshTokenQuery();

  useEffect(() => {
    const fetchRefreshToken = async () => {
      await getRefreshToken();
    };

    fetchRefreshToken();
  }, [getRefreshToken]);

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ accessToken: data.data }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      console.log('Failed to refresh token:', error);
    }
  }, [error]);

  return { isLoading, error };
};

export default useRefreshToken;
