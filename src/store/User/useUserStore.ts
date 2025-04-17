import { create } from "zustand";

export interface User {
  access_token: string | null;
  role: Role;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  full_name: string;
  image: Image;
  created_at: string;
  unread_notifications_count: number;
}

export interface Role {
  name: string;
}

export type Image = {
  image: string;
};

interface AuthState {
  user: User | undefined;
  isAuthenticated: boolean;
  notifications: Notification[];
}

interface AuthActions {
  setUser: (user: User) => void;
  setNotifications: (notifications: Notification[]) => void;
  logout: () => void;
}

const useUserStore = create<AuthState & AuthActions>((set) => ({
  user: undefined,
  isAuthenticated: false,
  notifications: [],

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  setNotifications: (notifications: Notification[]) => {
    set({ notifications });
  },

  logout: () => {
    set({ user: undefined, isAuthenticated: false });
  },
}));

export default useUserStore;
