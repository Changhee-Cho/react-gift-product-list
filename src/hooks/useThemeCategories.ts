import { useQuery } from '@tanstack/react-query';
import apiClient from '@src/lib/apiClient';
import { PRESENT_THEMES_URL } from '@src/apis/constants';
import { STALE_TIME } from '@/constants/apiReactQueryStaleTime';

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

const fetchThemes = async (): Promise<Theme[]> => {
  const response = await apiClient.get(PRESENT_THEMES_URL);
  return response.data?.data ?? [];
};

const useThemeCategories = (): ThemeState => {
  const { data, isLoading, isError } = useQuery<Theme[], Error>({
    queryKey: ['themeCategories'],
    queryFn: fetchThemes,
    staleTime: STALE_TIME,
    retry: false,
  });

  return {
    loading: isLoading,
    error: isError,
    categories: data ?? [],
  };
};

export default useThemeCategories;
