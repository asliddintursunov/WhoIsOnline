import { create } from "zustand";

export type OnlineUser = {
    userId: string;
    isOnline: boolean;
    lastSeenAt: string;
};

type OnlineUsersStore = {
    users: OnlineUser[];
    setUsers: (users: OnlineUser[]) => void;
    getUsers: () => OnlineUser[];
};

export const useOnlineUsersStore = create<OnlineUsersStore>((set, get) => ({
    users: [],
    setUsers: (users) => set({ users }),
    getUsers: () => get().users,
}));