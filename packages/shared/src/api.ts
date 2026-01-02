import { apiClient } from './axiosConfig';
import type {
  PackagesResponse,
  AuthResponse,
  LoginEmailRequest,
  RegisterEmailRequest,
  SendOTPRequest,
  VerifyOTPRequest,
  User,
} from './types';

// Packages API
export const packagesApi = {
  getAll: async (): Promise<PackagesResponse> => {
    const response = await apiClient.get<PackagesResponse>('/api/packages');
    return response.data;
  },
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

// Auth API
export const authApi = {
  loginWithEmail: async (data: LoginEmailRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.LOGIN_EMAIL,
      data
    );
    return response.data;
  },

  registerWithEmail: async (
    data: RegisterEmailRequest
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.REGISTER_EMAIL,
      data
    );
    return response.data;
  },

  sendOTP: async (data: SendOTPRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.SEND_OTP,
      data
    );
    return response.data;
  },

  verifyOTP: async (data: VerifyOTPRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.VERIFY_OTP,
      data
    );
    return response.data;
  },

  getCurrentUser: async (): Promise<{
    success: boolean;
    data?: { user: User };
  }> => {
    const response = await apiClient.get<{
      success: boolean;
      data?: { user: User };
    }>(AUTH_ENDPOINTS.ME);
    return response.data;
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  },
};
