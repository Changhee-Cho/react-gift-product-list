import { css } from '@emotion/react';
import theme from '@src/styles/tokens/index';
import PresentCard from '@/components/PresentCard';
import OrderForm from '@/components/OrderForm';
import ItemInfo from '@/components/ItemInfo';
import RecipientFormList from '@/components/RecipientFormList';
import type { OrderSchema } from '@src/hooks/useOrderForm';
import { FormProvider } from 'react-hook-form';
import useOrderFormComplete, {
  type SenderSchema,
} from '@/hooks/useOrderFormComplete';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductSummary } from '@/apis/orderpage';
import loadingGif from '@src/assets/icons/loading.gif';
import { useUserInfo } from '@/contexts/AuthContext';
import axios from 'axios';
import { createOrder } from '@/apis/orderrequest';
import ROUTES from '@/constants/routes';

const RECEIVER_REQUIRED_MESSAGE = '받는 사람을 추가해 주세요!';
const LOGIN_REQUIRED_MESSAGE = '로그인이 필요합니다.';

interface Product {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const sectionStyle = css`
  width: 100%;
  padding-bottom: 3.125rem;
  background-color: ${theme.colors.gray00};
`;

const buttonStyle = css`
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(254, 229, 0);
  color: rgb(42, 48, 56);
  transition:
    background-color 200ms,
    color 200ms;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  border: 0;
  cursor: pointer;
`;
const loadingDiv = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const loadingGifStyle = css`
  width: 50px;
`;

const space24 = css`
  height: 24px;
`;

const Order = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [recipientModalOpen, setRecipientModalOpen] = useState(false);
  const [recipients, setRecipients] = useState<OrderSchema[]>([]);
  const methods = useOrderFormComplete();
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUserInfo();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) return;
        const data = await fetchProductSummary(productId);
        setProduct(data);
      } catch (error) {
        navigate('/');
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product)
    return (
      <div css={loadingDiv}>
        <img css={loadingGifStyle} src={loadingGif} alt="로딩중..." />
      </div>
    );

  const unitPrice = product.price || 0;
  const totalRecipientQuantity = recipients.reduce(
    (sum, r) => sum + (Number(r.quantity) || 0),
    0
  );
  const totalOrderPrice = unitPrice * totalRecipientQuantity;

  const onSubmit = async (data: SenderSchema) => {
    setIsLoading(true);
    if (totalRecipientQuantity === 0) {
      alert(RECEIVER_REQUIRED_MESSAGE);
      setIsLoading(false);
      return;
    }

    const authToken = user?.authToken;
    if (!authToken) {
      alert(LOGIN_REQUIRED_MESSAGE);
      navigate('/login');
      setIsLoading(false);
      return;
    }

    const requestBody = {
      productId: product!.id,
      messageCardId: String(data.messageCardId),
      ordererName: data.senderName,
      message: data.letter,
      receivers: recipients.map((r) => ({
        name: r.recipientName,
        phoneNumber: r.recipientPhone,
        quantity: Number(r.quantity),
      })),
    };

    try {
      const response = await createOrder(authToken, requestBody);

      if (response.status === 201 && response.data?.data?.success) {
        alert(
          `주문이 완료되었습니다.\n` +
            `상품명: ${product!.name}\n` +
            `구매 수량: ${totalRecipientQuantity}\n` +
            `발신자 이름: ${data.senderName}\n` +
            `메시지: ${data.letter}`
        );
        navigate('/');
      } else {
        alert('주문 처리에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          navigate(ROUTES.LOGIN);
        }
      } else {
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div css={loadingDiv}>
          <img css={loadingGifStyle} src={loadingGif} alt="로딩중..." />
        </div>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section css={sectionStyle}>
            <PresentCard />
            <OrderForm
              onOpenRecipientModal={() => setRecipientModalOpen(true)}
              recipients={recipients}
            />
            <ItemInfo product={product} />
            <div css={space24} />
            <button type="submit" css={buttonStyle}>
              {totalOrderPrice.toLocaleString()}원 주문하기
            </button>
          </section>
        </form>
      </FormProvider>

      <RecipientFormList
        open={recipientModalOpen}
        onClose={() => setRecipientModalOpen(false)}
        recipients={recipients}
        setRecipients={setRecipients}
      />
    </>
  );
};

export default Order;
