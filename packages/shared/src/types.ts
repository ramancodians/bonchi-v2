export interface Package {
  id: number;
  name: string;
  description: string;
  version: string;
  type: 'library' | 'backend' | 'frontend';
}

export interface PackagesResponse {
  packages: Package[];
  total: number;
  timestamp: string;
}

// Auth Types
export type AuthType = 'EMAIL_PASSWORD' | 'SMS_OTP';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';

export interface User {
  id: number;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  name?: string | null;
  address?: string | null;
  district?: string | null;
  state?: string | null;
  gstNumber?: string | null;
  gender?: Gender | null;
  age?: number | null;
  authType: AuthType;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: User;
    token?: string;
    sessionId?: number;
  };
  error?: string;
}

export interface LoginEmailRequest {
  email: string;
  password: string;
}

export interface SendOTPRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
  sessionId: number;
}

export interface RegisterEmailRequest {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  phone?: string;
  address?: string;
  district: string;
  state: string;
  gstNumber?: string;
  gender: Gender;
  age?: number;
}

export interface RegisterPhoneRequest {
  phone: string;
  firstName: string;
  middleName?: string;
  email?: string;
  address?: string;
  district: string;
  state: string;
  gstNumber?: string;
  gender: Gender;
  age?: number;
}
