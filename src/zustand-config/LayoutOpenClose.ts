import { create } from 'zustand';

export interface LayoutOpenCloseState {
  open: boolean;
  setOpen: (value: boolean) => void;
  notifyOpen: boolean;
  setNotifyOpen: (value: boolean) => void;
}

const useLayoutOpenClose = create<LayoutOpenCloseState>()((set) => ({
  open: true,
  setOpen: (value) => set({ open: value }),
  notifyOpen: false,
  setNotifyOpen: (value) => set({ notifyOpen: value }),
}));

export default useLayoutOpenClose;
