import orderClient from '@/lib/apiOrderRequest';
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
  const response = await orderClient.post(ORDER_REQUEST_API_URL, body, {
    headers: {
      Authorization: authToken,
    },
  });
  return response;
};
