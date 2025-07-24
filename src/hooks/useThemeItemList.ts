import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { fetchThemeItemList } from '@/apis/themeItemList';
import type { themeItemInfo } from '@/types/themeItemInfo';
import { STALE_TIME } from '@/constants/apiReactQueryStaleTime';

const API_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';

interface FetchThemeItemListResponse {
  list: themeItemInfo[];
  cursor: number;
  hasMoreList: boolean;
}

interface UseThemeItemListResult {
  items: themeItemInfo[];
  loading: boolean;
  hasMore: boolean;
  lastRef: (node: HTMLDivElement | null) => void;
}

export const useThemeItemList = (
  themeId: string | undefined
): UseThemeItemListResult => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<FetchThemeItemListResponse>({
      queryKey: ['themeItemList', themeId],
      queryFn: async ({ pageParam = 0 }) => {
        if (!themeId) throw new Error('themeId가 필요합니다.');
        return await fetchThemeItemList(themeId, pageParam as number);
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.hasMoreList ? lastPage.cursor : undefined;
      },
      enabled: !!themeId,
      staleTime: STALE_TIME,
      retry: false,
      throwOnError: true,
    });

  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage || !hasNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage().catch((err) => {
            const message =
              err?.response?.data?.data?.message || API_ERROR_MESSAGE;
            alert(message);
          });
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const items = data?.pages.flatMap((page) => page.list) ?? [];

  return {
    items,
    loading: isLoading,
    hasMore: !!hasNextPage,
    lastRef,
  };
};
