// Auth store using Zustand

import { create } from "zustand";
import type { AdminUser } from "@/types";
import * as authService from "@/services/auth";

interface AuthState {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login({ email, password });

      if (response.success && response.user) {
        set({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error || "Login failed",
          isLoading: false,
        });
        return false;
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await authService.logout();
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  checkAuth: async () => {
    set({ isLoading: true });

    try {
      const isAuth = await authService.isAuthenticated();

      if (isAuth) {
        const user = await authService.getCurrentUser();
        set({
          user,
          isAuthenticated: user !== null,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
