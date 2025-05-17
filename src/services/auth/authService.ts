import {UserType} from '../../@types/userTypes';
import {api} from '../../api/httpClient';

export type SignInRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserType;
};

export const authService = {
  async signIn(payload: SignInRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('auth/signIn', payload);
    return response.data;
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('auth/refresh');
    return response.data;
  },
};
