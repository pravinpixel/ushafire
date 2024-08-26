import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { persist, createJSONStorage } from 'zustand/middleware';

import { primary } from 'theme/palette';

// import { decrypt, encrypt } from 'helper/GlobalHelper';
import { OptionsType, MyProfileDataType } from 'helper/types/GlobalTypes';
interface JwtType {
  id: string;
}
const accessToken = localStorage.getItem('AccessToken') || null;
const decodedToken = accessToken ? jwtDecode<JwtType>(accessToken) : null;
const encryptedStorage = () => ({
  getItem: async (name: string) => {
    const encryptedValue = async () => sessionStorage.getItem(name);
    // const bytes = decrypt(encryptedValue() as string);
    const decryptedData = await encryptedValue();
    if (decryptedData) {
      return window.atob(decryptedData);
    }
    return null;
  },
  setItem: (name: string, value: string) => {
    // const encryptedValue = encrypt(value);
    sessionStorage.setItem(name, window.btoa(value));
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
});

export type UserType = {
  code: string;
  name: string;
  email: string;
  role_id: null | OptionsType;
};

export interface AuthState {
  user_id: null | string;
  decodedToken: null | JwtType;
  user: MyProfileDataType | null;
  theme: null | object;
  setUser: (user: MyProfileDataType) => void;
  setTheme: (theme: UserType | null) => void;
}

const useMyProfieStore = create<AuthState>()(
  persist(
    (set) => ({
      user_id: accessToken,
      decodedToken: decodedToken,
      user: null,
      theme: primary,
      setUser: (user: MyProfileDataType) => {
        set((state) => ({ ...state, user }));
      },
      setTheme: (theme) => set((state) => ({ ...state, theme })),
    }),
    {
      name: 'getMe',
      // storage: createJSONStorage(() => sessionStorage),
      storage: createJSONStorage(() => encryptedStorage()),
    }
  )
);

export default useMyProfieStore;
