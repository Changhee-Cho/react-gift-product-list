import apiClient from '@/lib/apiClient';
import { THEME_ITEM_LIST } from '@/apis/constants';

const DEFAULT_CURSOR = 0;
const DEFAULT_LIMIT = 10;

export const fetchThemeItemList = async (
  themeId: string | number,
  cursor: number = DEFAULT_CURSOR,
  limit: number = DEFAULT_LIMIT
) => {
  const response = await apiClient.get(THEME_ITEM_LIST(themeId), {
    params: {
      cursor,
      limit,
    },
  });

  return response.data.data;
};
