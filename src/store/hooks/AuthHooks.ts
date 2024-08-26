import { useQuery, useMutation } from '@tanstack/react-query';

import { AuthGetMe, AuthLogin, AuthLogOut, AuthUpdate } from '../services/AuthServices';
export const GETME = 'getMe';
export const useAuthLogin = () => {
  return useMutation({ mutationFn: AuthLogin });
};

export const useAuthGetMe = () => {
  return useQuery({
    queryKey: [GETME],
    queryFn: () => AuthGetMe(),
    // gcTime: Infinity,
  });
};

export const useAuthUpdate = () => {
  return useMutation({ mutationFn: AuthUpdate });
};

export const useAuthLogOut = () => {
  return useMutation({ mutationFn: (value: object) => AuthLogOut(value) });
};
