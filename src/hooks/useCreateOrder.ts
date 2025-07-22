import { useState } from 'react';
import { createOrder as createOrderApi } from '@/apis/orderRequest';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import axios from 'axios';
import type { OrderSchema } from '@/hooks/useOrderForm';
import type { SenderSchema } from '@/hooks/useOrderFormComplete';
import type { Product } from '@/types/product';

const RECEIVER_REQUIRED_MESSAGE = '받는 사람을 추가해 주세요!';
const LOGIN_REQUIRED_MESSAGE = '로그인이 필요합니다.';

export const useCreateOrder = (
  userToken: string | undefined,
  recipients: OrderSchema[],
  product: Product | null
) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const navigate = useNavigate();

  const validateOrder = (): boolean => {
    const totalRecipientQuantity = recipients.reduce(
      (sum, r) => sum + (Number(r.quantity) || 0),
      0
    );

    if (totalRecipientQuantity === 0) {
      alert(RECEIVER_REQUIRED_MESSAGE);
      return false;
    }

    if (!userToken) {
      alert(LOGIN_REQUIRED_MESSAGE);
      navigate(ROUTES.LOGIN);
      return false;
    }

    if (!product) {
      alert('상품 정보가 없습니다.');
      return false;
    }

    return true;
  };

  const buildOrderRequestBody = (senderData: SenderSchema) => ({
    productId: product!.id,
    messageCardId: String(senderData.messageCardId),
    ordererName: senderData.senderName,
    message: senderData.letter,
    receivers: recipients.map((r) => ({
      name: r.recipientName,
      phoneNumber: r.recipientPhone,
      quantity: Number(r.quantity),
    })),
  });

  const sendOrderRequest = async (requestBody: ReturnType<typeof buildOrderRequestBody>) => {
    return await createOrderApi(userToken!, requestBody);
  };

  const createOrder = async (senderData: SenderSchema) => {
    setIsOrdering(true);

    if (!validateOrder()) {
      setIsOrdering(false);
      return;
    }

    const requestBody = buildOrderRequestBody(senderData);
    const totalRecipientQuantity = recipients.reduce(
      (sum, r) => sum + (Number(r.quantity) || 0),
      0
    );

    try {
      const response = await sendOrderRequest(requestBody);

      if (response.status === 201 && response.data?.data?.success) {
        alert(
          `주문이 완료되었습니다.\n` +
            `상품명: ${product!.name}\n` +
            `구매 수량: ${totalRecipientQuantity}\n` +
            `발신자 이름: ${senderData.senderName}\n` +
            `메시지: ${senderData.letter}`
        );
        navigate(ROUTES.HOME);
      } else {
        alert('주문 처리에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        navigate(ROUTES.LOGIN);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
        console.error(error);
      }
    } finally {
      setIsOrdering(false);
    }
  };

  return { createOrder, isOrdering };
};
