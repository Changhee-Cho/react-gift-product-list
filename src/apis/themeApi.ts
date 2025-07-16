import apiClient from '@src/lib/apiClient';
import { PRESENT_THEMES_URL } from '@src/apis/constants';

export async function fetchThemes() {
  const response = await apiClient.get(PRESENT_THEMES_URL);
  return response.data.data;
}
