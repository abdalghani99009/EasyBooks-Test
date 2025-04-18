import { create } from "zustand";

interface UserState {
  user: string | undefined;
  isAuthenticated: boolean;
}

interface UserActions {
  setUser: (user: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState & UserActions>((set) => ({
  user: undefined,
  isAuthenticated: false,

  setUser: (user: string) => {
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    set({ user: undefined, isAuthenticated: false });
  },
}));

export default useUserStore;
