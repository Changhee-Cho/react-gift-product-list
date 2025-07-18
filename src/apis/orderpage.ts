import apiOrderClient from '@/lib/apiOrderClient';
import { PRODUCT_SUMMARY_URL } from '@/apis/constants';

export const fetchProductSummary = async (productId: string | number) => {
  const response = await apiOrderClient.get(PRODUCT_SUMMARY_URL(productId));
  return response.data.data;
};
