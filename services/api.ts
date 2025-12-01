// Base API client for PineTech backend

import { API_BASE_URL } from "@/lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN_KEY = "pinetech_auth_token";

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  async setAuthToken(token: string): Promise<void> {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  async clearAuthToken(): Promise<void> {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  }

  async hasAuthToken(): Promise<boolean> {
    const token = await this.getAuthToken();
    return token !== null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { requiresAuth = false, ...fetchOptions } = options;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {}),
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = await this.getAuthToken();
      if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
    }

    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        if (!response.ok) {
          throw new ApiError(response.status, "Request failed");
        }
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          response.status,
          data.error || data.message || "Request failed"
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, "Network error. Please check your connection.");
    }
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async patch<T>(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

// Custom error class for API errors
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isConflict(): boolean {
    return this.status === 409;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);
