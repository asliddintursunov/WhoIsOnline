import { create } from "zustand";

export type OnlineUser = {
  id: string;
  isOnline: boolean;
  lastSeenAt: string | null;
};

type OnlineUsersStore = {
  users: OnlineUser[];
  setUsers: (users: OnlineUser[]) => void;
  amIOnline: boolean;
  setAmIOnline: (status: boolean) => void;
  reset: () => void;
};

export const useOnlineUsersStore = create<OnlineUsersStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  amIOnline: false,
  setAmIOnline: (status) => set({ amIOnline: status }),
  reset: () => set({ users: [], amIOnline: false }),
}));
