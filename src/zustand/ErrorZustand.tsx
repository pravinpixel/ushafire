import { create } from "zustand";

type ErrorStoreType = {
    message: string | null,
    show?: boolean,
}


export const errorStore = create<{
    setShowMessage: (error: ErrorStoreType) => void
} & ErrorStoreType>((set) => ({
    message: null,
    show: false,
    setShowMessage: ({ message }) => set({ message }),
}))

export default errorStore;