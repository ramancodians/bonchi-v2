import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from '@tanstack/react-query';
import { packagesApi, authApi } from './api';
import { authUtils } from './auth';
import type {
  PackagesResponse,
  AuthResponse,
  LoginEmailRequest,
  RegisterEmailRequest,
  SendOTPRequest,
  VerifyOTPRequest,
  User,
} from './types';

// Query Keys
export const queryKeys = {
  packages: ['packages'] as const,
  currentUser: ['currentUser'] as const,
};

// ============================================
// PACKAGES HOOKS
// ============================================

export const usePackages = (): UseQueryResult<PackagesResponse, Error> => {
  return useQuery({
    queryKey: queryKeys.packages,
    queryFn: packagesApi.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// ============================================
// AUTH HOOKS - React Query Based
// ============================================

/**
 * Hook to get current user data
 */
export const useCurrentUser = (): UseQueryResult<User | null, Error> => {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: async () => {
      const token = authUtils.getToken();
      if (!token) return null;

      try {
        const response = await authApi.getCurrentUser();
        if (response.success && response.data?.user) {
          return response.data.user;
        }
        return null;
      } catch {
        authUtils.clearAuthData();
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook for email login mutation
 */
export const useLoginEmailMutation = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginEmailRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.loginWithEmail,
    onSuccess: (data) => {
      if (data.success && data.data?.token && data.data?.user) {
        authUtils.setAuthData(data.data.token, data.data.user);
        queryClient.setQueryData(queryKeys.currentUser, data.data.user);
      }
    },
  });
};

/**
 * Hook for email registration mutation
 */
export const useRegisterEmailMutation = (): UseMutationResult<
  AuthResponse,
  Error,
  RegisterEmailRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.registerWithEmail,
    onSuccess: (data) => {
      if (data.success && data.data?.token && data.data?.user) {
        authUtils.setAuthData(data.data.token, data.data.user);
        queryClient.setQueryData(queryKeys.currentUser, data.data.user);
      }
    },
  });
};

/**
 * Hook for sending OTP mutation
 */
export const useSendOTPMutation = (): UseMutationResult<
  AuthResponse,
  Error,
  SendOTPRequest
> => {
  return useMutation({
    mutationFn: authApi.sendOTP,
  });
};

/**
 * Hook for verifying OTP mutation
 */
export const useVerifyOTPMutation = (): UseMutationResult<
  AuthResponse,
  Error,
  VerifyOTPRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.verifyOTP,
    onSuccess: (data) => {
      if (data.success && data.data?.token && data.data?.user) {
        authUtils.setAuthData(data.data.token, data.data.user);
        queryClient.setQueryData(queryKeys.currentUser, data.data.user);
      }
    },
  });
};

/**
 * Hook for logout mutation
 */
export const useLogoutMutation = (): UseMutationResult<
  { success: boolean; message: string },
  Error,
  void
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      authUtils.clearAuthData();
      queryClient.setQueryData(queryKeys.currentUser, null);
      queryClient.clear();
    },
    onError: () => {
      // Clear data even on error
      authUtils.clearAuthData();
      queryClient.setQueryData(queryKeys.currentUser, null);
      queryClient.clear();
    },
  });
};
