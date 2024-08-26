import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { io, Socket } from 'socket.io-client';

import { GETME } from 'store/hooks/AuthHooks';

import { queryClient } from '../main';
import useAuthStore from './MyProfileZustand';
import { getLocalStorage } from '../configs/StorageConfigs';
import { notify, SESSIONANDLOCAL } from '../helper/GlobalHelper';

const accessToken = getLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN);
const decodedToken = () => (accessToken ? jwtDecode<{ id: string }>(accessToken) : null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socket: Socket = io(SOCKET_URL, {
  query: {
    userId: decodedToken()?.id,
    url: window.location.href,
  },
});

interface SocketState {
  socket: Socket | null;
  setSocket: () => void;
  socketEmits: () => void;
  myData: null | {
    isAdmin: boolean;
    permission: object;
  };
}

const useSocketStore = create<SocketState>()((set) => ({
  socket: socket || null,
  myData: null,
  socketEmits: () => {
    if (socket) {
      const refech = queryClient;
      socket?.emit('getMe', decodedToken);
      socket?.emit('join_room', decodedToken()?.id);
      socket?.send('join_room');
      socket?.on('getMeResponse', ({ user }) => {
        set((state) => ({ ...state, myData: user }));
      });
      socket?.on('RoleUpdated', async (message) => {
        await refech.refetchQueries({ queryKey: [GETME] });
        notify({ success: true, message });
      });
      socket?.on('getMeUpdate', ({ user }) => {
        set((state) => ({ ...state, myData: user }));
      });
      socket?.on('updateTheme', ({ theme }) => {
        useAuthStore.getState().setTheme(theme);
      });
      return () => {
        socket?.disconnect();
      };
    } else {
      // eslint-disable-next-line no-console
      console.log('Connection failed');
    }
  },
  setSocket: () => set((state) => ({ ...state, socket: socket })),
}));

export default useSocketStore;
