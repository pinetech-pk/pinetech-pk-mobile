// Authentication service

import { api } from "./api";
import type { LoginRequest, LoginResponse, AdminUser } from "@/types";

/**
 * Admin login
 * Note: The web app uses NextAuth with credentials provider.
 * For mobile, we'll need a compatible endpoint or JWT-based auth.
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    // This endpoint would need to be added to the web app API
    // For now, we're preparing the structure
    const response = await api.post<LoginResponse>(
      "/api/auth/mobile-login",
      credentials
    );

    if (response.success && response.token) {
      await api.setAuthToken(response.token);
    }

    return response;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    };
  }
}

/**
 * Logout - clear stored token
 */
export async function logout(): Promise<void> {
  await api.clearAuthToken();
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  return api.hasAuthToken();
}

/**
 * Get current user info
 * This would need to be implemented on the backend
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const hasToken = await api.hasAuthToken();
    if (!hasToken) return null;

    // This endpoint would need to be added to the web app API
    const response = await api.get<{ user: AdminUser }>("/api/auth/me", {
      requiresAuth: true,
    });

    return response.user;
  } catch {
    return null;
  }
}

/**
 * Verify admin session is still valid
 */
export async function verifySession(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user !== null && user.role === "admin";
  } catch {
    return false;
  }
}
