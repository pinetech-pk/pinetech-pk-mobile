// Auth hook - wrapper around auth store with additional utilities

import { useEffect } from "react";
import { useAuthStore } from "@/store";

export function useAuth() {
  const {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    checkAuth,
    clearError,
  } = useAuthStore();

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    logout,
    clearError,
    isAdmin: user?.role === "admin",
  };
}
