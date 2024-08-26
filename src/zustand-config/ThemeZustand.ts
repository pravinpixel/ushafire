import { create } from 'zustand';

export interface ThemeState {
  theme: null | object;
  setTheme: (theme: object | null) => void;
}

const useThemeStore = create<ThemeState>()((set) => ({
  theme: null,
  setTheme: (theme) => set((state) => ({ ...state, theme: theme })),
}));

export default useThemeStore;
