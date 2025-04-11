import {UserType} from '../../@types/userTypes';
import {api} from '../../api/httpClient';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
  user: UserType;
};

export const authService = {
  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    const response = await api.post<SignInResponse>('auth/signIn', payload);
    return response.data;
  },
};
