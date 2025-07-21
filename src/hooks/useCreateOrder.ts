import { useState } from 'react';
import { createOrder } from '@/apis/orderrequest';
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

  const create = async (senderData: SenderSchema) => {
    setIsOrdering(true);

    const totalRecipientQuantity = recipients.reduce(
      (sum, r) => sum + (Number(r.quantity) || 0),
      0
    );

    if (totalRecipientQuantity === 0) {
      alert(RECEIVER_REQUIRED_MESSAGE);
      setIsOrdering(false);
      return;
    }

    if (!userToken) {
      alert(LOGIN_REQUIRED_MESSAGE);
      navigate(ROUTES.LOGIN);
      setIsOrdering(false);
      return;
    }

    if (!product) {
      alert('상품 정보가 없습니다.');
      setIsOrdering(false);
      return;
    }

    const requestBody = {
      productId: product.id,
      messageCardId: String(senderData.messageCardId),
      ordererName: senderData.senderName,
      message: senderData.letter,
      receivers: recipients.map((r) => ({
        name: r.recipientName,
        phoneNumber: r.recipientPhone,
        quantity: Number(r.quantity),
      })),
    };

    try {
      const response = await createOrder(userToken, requestBody);
      if (response.status === 201 && response.data?.data?.success) {
        alert(
          `주문이 완료되었습니다.\n` +
            `상품명: ${product.name}\n` +
            `구매 수량: ${totalRecipientQuantity}\n` +
            `발신자 이름: ${senderData.senderName}\n` +
            `메시지: ${senderData.letter}`
        );
        navigate(ROUTES.HOME);
        return;
      } else {
        alert('주문 처리에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        navigate(ROUTES.LOGIN);
      }
    } finally {
      setIsOrdering(false);
    }
  };

  return { createOrder: create, isOrdering };
};
