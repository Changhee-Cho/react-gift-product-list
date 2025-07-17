import { useEffect, useState } from 'react';
import apiClient from '@src/lib/apiClient';
import { PRESENT_THEMES_URL } from '@src/apis/constants';

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

type ThemeState = {
  loading: boolean;
  error: boolean;
  categories: Theme[];
};

const useThemeCategories = () => {
  const [state, setState] = useState<ThemeState>({
    loading: true,
    error: false,
    categories: [],
  });

  useEffect(() => {
    const getThemes = async () => {
      try {
        setState({ loading: true, error: false, categories: [] });

        const response = await apiClient.get(PRESENT_THEMES_URL);
        const data = response.data?.data ?? [];

        setState({ loading: false, error: false, categories: data });
      } catch (error) {
        setState({ loading: false, error: true, categories: [] });
      }
    };

    getThemes();
  }, []);

  return state;
};

export default useThemeCategories;
