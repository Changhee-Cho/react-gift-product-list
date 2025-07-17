import { useEffect, useState } from 'react';
import apiClient from '@src/lib/apiClient';
import { REALTIME_API_URL } from '@src/apis/constants';

type Product = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

type RankingProductParams = {
  targetType: string;
  rankType: string;
};

type RankingProductState = {
  loading: boolean;
  error: boolean;
  products: Product[];
};

const useRankingProducts = ({ targetType, rankType }: RankingProductParams) => {
  const [state, setState] = useState<RankingProductState>({
    loading: true,
    error: false,
    products: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setState({ loading: true, error: false, products: [] });

        const response = await apiClient.get(REALTIME_API_URL, {
          params: { targetType, rankType },
        });

        const data = response.data?.data ?? [];

        setState({ loading: false, error: false, products: data });
      } catch (error) {
        setState({ loading: false, error: true, products: [] });
      }
    };

    fetchProducts();
  }, [targetType, rankType]);

  return state;
};

export default useRankingProducts;
