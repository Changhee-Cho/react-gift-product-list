import { useEffect, useState } from 'react';
import { fetchProductSummary } from '@/apis/orderpage';
import type { Product } from '@/types/product';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ROUTES from '@/constants/routes';

const DEFAULT_API_ERROR_MESSAGE = '요청에 실패했습니다.';

export const useFetchProduct = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const data = await fetchProductSummary(productId);
        setProduct(data);
      } catch (error: any) {
        const status = error?.response?.status;
        const errorMessage =
          error?.response?.data?.data?.message || DEFAULT_API_ERROR_MESSAGE;

        if (status >= 400 && status < 500) {
          toast.error(errorMessage);
          navigate(ROUTES.HOME);
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
