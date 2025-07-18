const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MY_PAGE: '/my',
  ORDER_DETAIL_BASE: '/order/:productId',
  NOT_FOUND: '*',
} as const;

export default ROUTES;
