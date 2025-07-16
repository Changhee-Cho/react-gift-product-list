import apiClient from '@src/lib/apiClient';

const PRESENT_THEMES_URL = '/themes';

export async function fetchThemes() {
  const response = await apiClient.get(PRESENT_THEMES_URL);
  return response.data.data;
}
