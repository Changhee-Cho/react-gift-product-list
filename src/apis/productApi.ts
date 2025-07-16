import apiClient from '@src/lib/apiClient';
import { REALTIME_API_URL } from '@src/apis/constants';

export async function fetchRankingProducts(params: {
  targetType: string;
  rankType: string;
}) {
  const response = await apiClient.get(REALTIME_API_URL, { params });
  return response.data.data;
}
