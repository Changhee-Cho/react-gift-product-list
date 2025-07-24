import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchThemeInfo } from '@/apis/themeInfo';
import { toast } from 'react-toastify';
import ROUTES from '@/constants/routes';
import type { themeInfo } from '@/types/themeInfo';
import { STALE_TIME } from '@/constants/apiReactQueryStaleTime';

const RESPONSE_404_ERROR_MSG = '해당 ID에 일치하는 데이터가 없습니다.';

export const useThemeInfo = (themeId: string | undefined) => {
  const navigate = useNavigate();

  const {
    data: themeInfo,
    isLoading: loading,
    error,
  } = useQuery<themeInfo, any>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => {
      if (!themeId) return Promise.reject('themeId가 없습니다.');
      return fetchThemeInfo(themeId);
    },
    enabled: !!themeId,
    retry: false,
    staleTime: STALE_TIME,
  });

  if (error && error.response?.status === 404) {
    toast.error(RESPONSE_404_ERROR_MSG);
    navigate(ROUTES.HOME);
  }

  return { themeInfo, loading };
};
