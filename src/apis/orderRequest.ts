import apiClient from '@/lib/apiClient';
import { ORDER_REQUEST_API_URL } from './constants';

interface OrderRequestBody {
  productId: number;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
}

export const createOrder = async (
  authToken: string,
  body: OrderRequestBody
) => {
  const response = await apiClient.post(ORDER_REQUEST_API_URL, body, {
    headers: {
      Authorization: authToken,
    },
  });
  return response;
};
