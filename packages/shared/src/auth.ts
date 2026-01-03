import { useState } from 'react';
import type { AxiosInstance } from 'axios';
import {
  AuthResponse,
  LoginEmailRequest,
  SendOTPRequest,
  VerifyOTPRequest,
  RegisterEmailRequest,
  User,
} from './types';

// Global apiClient reference - must be set before using auth utilities
let apiClient: AxiosInstance;

/**
 * Initialize the auth module with an axios instance
 * Must be called before using any auth functions
 */
export const initializeAuth = (axiosInstance: AxiosInstance) => {
  apiClient = axiosInstance;
  // Initialize auth state from storage
  const token = authUtils.getToken();
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Auth API endpoints
const AUTH_ENDPOINTS = {
  LOGIN_EMAIL: '/api/auth/login/email',
  REGISTER_EMAIL: '/api/auth/register/email',
  SEND_OTP: '/api/auth/otp/send',
  VERIFY_OTP: '/api/auth/otp/verify',
  ME: '/api/auth/me',
  LOGOUT: '/api/auth/logout',
};

// Local storage keys
const TOKEN_KEY = 'bonchi_auth_token';
const USER_KEY = 'bonchi_user';
const TOKEN_COOKIE_NAME = 'bonchi_token';
const COOKIE_EXPIRY_DAYS = 7;

// Check if we're in a browser environment
const isBrowser =
  typeof window !== 'undefined' && typeof localStorage !== 'undefined';

/**
 * Cookie utility functions
 */
const cookieUtils = {
  set(name: string, value: string, days: number) {
    if (!isBrowser) return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  },

  get(name: string): string | null {
    if (!isBrowser) return null;
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  },

  remove(name: string) {
    if (!isBrowser) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  },
};

/**
 * Auth utility functions
 */
export const authUtils = {
  /**
   * Store auth token and user data
   */
  setAuthData(token: string, user: User) {
    if (!isBrowser) return;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // Save token to cookie for persistence
    cookieUtils.set(TOKEN_COOKIE_NAME, token, COOKIE_EXPIRY_DAYS);
    // Set token in apiClient headers
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  /**
   * Get stored auth token (checks localStorage first, then cookie)
   */
  getToken(): string | null {
    if (!isBrowser) return null;
    // Try localStorage first
    const localToken = localStorage.getItem(TOKEN_KEY);
    if (localToken) return localToken;
    // Fallback to cookie
    return cookieUtils.get(TOKEN_COOKIE_NAME);
  },

  /**
   * Get stored user data
   */
  getUser(): User | null {
    if (!isBrowser) return null;
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  /**
   * Clear auth data
   */
  clearAuthData() {
    if (!isBrowser) return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Remove cookie
    cookieUtils.remove(TOKEN_COOKIE_NAME);
    delete apiClient.defaults.headers.common['Authorization'];
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

/**
 * Hook for email/password authentication
 */
export const useEmailAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.LOGIN_EMAIL,
        { email, password } as LoginEmailRequest
      );

      if (
        response.data.success &&
        response.data.data?.token &&
        response.data.data?.user
      ) {
        authUtils.setAuthData(
          response.data.data.token,
          response.data.data.user
        );
      }

      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    userData: Omit<RegisterEmailRequest, 'email' | 'password'>
  ): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.REGISTER_EMAIL,
        { email, password, ...userData } as RegisterEmailRequest
      );

      if (
        response.data.success &&
        response.data.data?.token &&
        response.data.data?.user
      ) {
        authUtils.setAuthData(
          response.data.data.token,
          response.data.data.user
        );
      }

      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
};

/**
 * Hook for SMS OTP authentication
 */
export const useOTPAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);

  const sendOTP = async (phone: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.SEND_OTP,
        { phone } as SendOTPRequest
      );

      if (response.data.success && response.data.data?.sessionId) {
        setSessionId(response.data.data.sessionId);
      }

      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to send OTP';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (
    phone: string,
    otp: string,
    userData?: Omit<RegisterEmailRequest, 'email' | 'password'>
  ): Promise<AuthResponse> => {
    if (!sessionId) {
      const errorMessage = 'No active OTP session';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<AuthResponse>(
        AUTH_ENDPOINTS.VERIFY_OTP,
        { phone, otp, sessionId, ...userData }
      );

      if (
        response.data.success &&
        response.data.data?.token &&
        response.data.data?.user
      ) {
        authUtils.setAuthData(
          response.data.data.token,
          response.data.data.user
        );
        setSessionId(null);
      }

      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Failed to verify OTP';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const resetSession = () => {
    setSessionId(null);
    setError(null);
  };

  return { sendOTP, verifyOTP, resetSession, loading, error, sessionId };
};

/**
 * Hook for auth state management
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authUtils.getUser());
  const [loading, setLoading] = useState(false);

  const logout = () => {
    authUtils.clearAuthData();
    setUser(null);
  };

  const refreshUser = async () => {
    const token = authUtils.getToken();
    if (!token) {
      setUser(null);
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.get<{
        success: boolean;
        data?: { user: User };
      }>(AUTH_ENDPOINTS.ME);

      if (response.data.success && response.data.data?.user) {
        const userData = response.data.data.user;
        if (isBrowser) {
          localStorage.setItem(USER_KEY, JSON.stringify(userData));
        }
        setUser(userData);
      } else {
        logout();
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    if (isBrowser) {
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    logout,
    refreshUser,
    updateUser,
    loading,
  };
};
