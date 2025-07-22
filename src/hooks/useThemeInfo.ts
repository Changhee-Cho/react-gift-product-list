import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchThemeInfo } from '@/apis/themeInfo';
import { toast } from 'react-toastify';
import ROUTES from '@/constants/routes';
import type { themeInfo } from '@/types/themeInfo';

const RESPONSE_404_ERROR_MSG = '해당 ID에 일치하는 데이터가 없습니다.';

export const useThemeInfo = (themeId: string | undefined) => {
  const [themeInfo, setThemeInfo] = useState<themeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!themeId) return;

    setLoading(true);
    fetchThemeInfo(themeId)
      .then((data) => {
        setThemeInfo(data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        if (error.response?.status === 404) {
          toast.error(RESPONSE_404_ERROR_MSG);
          navigate(ROUTES.HOME);
        }
      });
  }, [themeId, navigate]);

  return { themeInfo, loading };
};
