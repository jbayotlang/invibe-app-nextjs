'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios-client';

export type TLoginInput = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
};

// Login mutation
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: TLoginInput): Promise<TLoginResponse> => {
      const response = await apiClient.post('/auth.login', data);
      return response.data;
    },
  });
}; 