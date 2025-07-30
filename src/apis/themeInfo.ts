import apiClient from '@/lib/apiClient';
import { THEME_INFO } from '@/apis/constants';

export const fetchThemeInfo = async (themeId: string | number) => {
  const response = await apiClient.get(THEME_INFO(themeId));
  return response.data.data;
};
