import { create } from "zustand";

interface UserState {
  user: string | undefined;
  isAuthenticated: boolean;
}

interface UserActions {
  setUser: (user: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
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
  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },
}));

export default useUserStore;
