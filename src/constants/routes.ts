const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MY_PAGE: '/my',
  ORDER_DETAIL_BASE: '/order/:productId',
  NOT_FOUND: '*',
  THEME_PAGE: '/themes/:themeId',
} as const;

export const getThemePagePath = (themeId: string) => `/themes/${themeId}`;
export default ROUTES;
