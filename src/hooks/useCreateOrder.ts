import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createOrder as createOrderApi } from '@/apis/orderRequest';
import ROUTES from '@/constants/routes';
import axios from 'axios';
import type { OrderSchema } from '@/hooks/useOrderForm';
import type { SenderSchema } from '@/hooks/useOrderFormComplete';
import type { Product } from '@/types/product';

const RECEIVER_REQUIRED_MESSAGE = '받는 사람을 추가해 주세요!';
const LOGIN_REQUIRED_MESSAGE = '로그인이 필요합니다.';
const NO_ITEM_MESSAGE = '상품 정보가 없습니다.';
const ERROR_NO_401_MESSAGE = '로그인이 필요합니다.';

interface UseCreateOrderProps {
  userToken?: string;
  recipients: OrderSchema[];
  product: Product | null;
}

export const useCreateOrder = ({
  userToken,
  recipients,
  product,
}: UseCreateOrderProps) => {
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
      alert(NO_ITEM_MESSAGE);
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

  const mutation = useMutation({
    mutationFn: async (senderData: SenderSchema) => {
      const requestBody = buildOrderRequestBody(senderData);
      return await createOrderApi(userToken!, requestBody);
    },
    onSuccess: (response, senderData) => {
      const totalRecipientQuantity = recipients.reduce(
        (sum, r) => sum + (Number(r.quantity) || 0),
        0
      );

      if (response.status === 201 && response.data?.data?.success) {
        alert(
          `주문이 완료되었습니다.\n` +
            `상품명: ${product!.name}\n` +
            `구매 수량: ${totalRecipientQuantity}\n` +
            `발신자 이름: ${senderData.senderName}\n` +
            `메시지: ${senderData.letter}`
        );
        navigate(ROUTES.HOME);
      }
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert(ERROR_NO_401_MESSAGE);
        navigate(ROUTES.LOGIN);
      }
    },
  });

  const createOrder = (senderData: SenderSchema) => {
    if (!validateOrder()) return;
    mutation.mutate(senderData);
  };

  return {
    createOrder,
    isOrdering: mutation.isPending,
  };
};
