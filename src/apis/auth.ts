import apiClient from '@/lib/apiClient';
import { LOGIN_API_URL } from './constants';
interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  name: string;
  authToken: string;
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await apiClient.post(LOGIN_API_URL, params);
  return response.data.data;
};
