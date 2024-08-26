import { LoginTypes } from 'helper/types/AuthTypes';

import API from 'configs/AxiosConfig';
import { unsetLocalStorage } from 'configs/StorageConfigs';

const AuthLogin = async (formData: LoginTypes) => {
  const response = await API.post(`/auth/login`, formData);
  return response;
};

const AuthGetMe = async () => {
  try {
    const response = await API.get(`/auth/getme`);
    return response.data as string;
  } catch {
    unsetLocalStorage();
  }
};

const AuthUpdate = async (formData: object) => {
  const response = await API.postForm(`/auth`, formData);
  return response;
};

const AuthLogOut = async (value: object) => {
  const response = await API.get(`/auth/logout`, value);
  return response;
};

export { AuthLogin, AuthGetMe, AuthUpdate, AuthLogOut };
