import apiClient from '@src/lib/apiClient';

const REALTIME_API_URL = '/products/ranking';

export async function fetchRankingProducts(params: {
  targetType: string;
  rankType: string;
}) {
  const response = await apiClient.get(REALTIME_API_URL, { params });
  return response.data.data;
}
