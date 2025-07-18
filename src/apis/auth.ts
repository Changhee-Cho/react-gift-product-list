import ROUTES from '@/constants/routes';
import apiLoginClient from '@/lib/apiLoginClient';
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
  const response = await apiLoginClient.post(ROUTES.HOME, params);
  return response.data.data;
};
