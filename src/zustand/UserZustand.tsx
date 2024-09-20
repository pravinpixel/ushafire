import { create } from "zustand";
import { getLocalStorage } from "../utils/helpers/storageConfigs";
import { SESSIONANDLOCAL } from "../utils/constants";

const userStore = create<UserStoreType>((set) => ({
	token: getLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN) || null,
	setToken: (token) => set({ token }),
	setUser: (user) => set({ user }),
}));

export default userStore;
