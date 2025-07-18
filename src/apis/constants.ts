export const BASE_URL = 'http://localhost:3000/api';
export const REALTIME_API_URL = '/products/ranking';
export const PRESENT_THEMES_URL = '/themes';
export const LOGIN_API_URL = '/login';
export const ORDER_REQUEST_API_URL = '/order';
export const PRODUCT_SUMMARY_URL = (productId: string | number) =>
  `/products/${productId}/summary`;
