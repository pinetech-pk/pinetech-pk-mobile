// Authentication service

import { api } from "./api";
import type { LoginRequest, LoginResponse, AdminUser } from "@/types";
import { USE_MOCK_DATA, mockApi, mockAdminUser } from "@/lib/mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MOCK_AUTH_KEY = "pinetech_mock_auth";

/**
 * Admin login
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    // Use mock data if enabled
    if (USE_MOCK_DATA) {
      const response = await mockApi.login(credentials.email, credentials.password);
      if (response.success) {
        await AsyncStorage.setItem(MOCK_AUTH_KEY, "true");
        await api.setAuthToken(response.token || "mock-token");
      }
      return response;
    }

    // Real API call
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
  await AsyncStorage.removeItem(MOCK_AUTH_KEY);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  if (USE_MOCK_DATA) {
    const mockAuth = await AsyncStorage.getItem(MOCK_AUTH_KEY);
    return mockAuth === "true";
  }
  return api.hasAuthToken();
}

/**
 * Get current user info
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    // Use mock data if enabled
    if (USE_MOCK_DATA) {
      const isAuth = await isAuthenticated();
      return isAuth ? mockAdminUser : null;
    }

    const hasToken = await api.hasAuthToken();
    if (!hasToken) return null;

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
