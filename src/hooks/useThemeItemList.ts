import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchThemeItemList } from '@/apis/themeItemList';
import type { themeItemInfo } from '@/types/themeItemInfo';

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
  const [items, setItems] = useState<themeItemInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchItems = useCallback(async (themeId: string, cursor: number) => {
    try {
      setLoading(true);
      const data: FetchThemeItemListResponse = await fetchThemeItemList(
        themeId,
        cursor
      );
      setItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filtered = data.list.filter((item) => !existingIds.has(item.id));
        return [...prev, ...filtered];
      });
      setCursor(data.cursor);
      setHasMore(data.hasMoreList);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!themeId) return;
    setItems([]);
    setCursor(0);
    setHasMore(true);
    fetchItems(themeId, 0);
  }, [themeId, fetchItems]);

  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && themeId && !loading) {
          fetchItems(themeId, cursor);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, cursor, themeId, fetchItems]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return { items, loading, hasMore, lastRef };
};
