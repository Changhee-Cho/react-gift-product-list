import apiClient from '@/lib/apiClient';
import { PRODUCT_SUMMARY_URL } from '@/apis/constants';

export const fetchProductSummary = async (productId: string | number) => {
  const response = await apiClient.get(PRODUCT_SUMMARY_URL(productId));
  return response.data.data;
};
