import { css } from '@emotion/react';
import theme from '@/styles/tokens';
import { useParams } from 'react-router-dom';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';
import loadingGif from '@src/assets/icons/loading.gif';
import { useThemeItemList } from '@/hooks/useThemeItemList';

const NO_ITEMS_MESSAGE = '상품이 없습니다.';

const divCover = css`
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
`;
const divItemList = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;
const linkStyle = css`
  text-decoration: none;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;
const itemBox = css`
  width: 100%;
`;
const itemImgStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  background-color: ${theme.colors.backgroundDisabled};
`;
const brandP = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${theme.typography.subtitle2Regular.fontSize};
  font-weight: ${theme.typography.subtitle2Regular.fontWeight};
  line-height: ${theme.typography.subtitle2Regular.lineHeight};
  color: ${theme.colors.textSub};
  margin: 0;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const itemNameH6 = css`
  font-size: ${theme.typography.subtitle2Regular.fontSize};
  font-weight: ${theme.typography.subtitle2Regular.fontWeight};
  line-height: ${theme.typography.subtitle2Regular.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const priceP = css`
  font-size: ${theme.typography.title2Bold.fontSize};
  font-weight: ${theme.typography.title2Bold.fontWeight};
  line-height: ${theme.typography.title2Bold.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0;
  text-align: left;
  word-break: break-word;
`;
const spacer12 = css`
  height: ${theme.spacing.spacing3};
`;
const spacer4 = css`
  height: ${theme.spacing.spacing1};
`;
const noItemsDiv = css`
  width: 100%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const noItemsText = css`
  font-size: ${theme.typography.subtitle2Regular.fontSize};
  font-weight: ${theme.typography.subtitle2Regular.fontWeight};
  line-height: ${theme.typography.subtitle2Regular.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0;
  width: 100%;
  text-align: center;
`;
const loadingStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const loadingGifStyle = css`
  width: 50px;
`;
const bottomLoading = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
`;

const ThemeItemList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { items, loading, hasMore, lastRef } = useThemeItemList(themeId);

  const { navigateIfLoggedIn } = useAuthNavigation();

  const goOrder = (id: number) => {
    navigateIfLoggedIn(`/order/${id}`);
  };

  if (loading && items.length === 0)
    return (
      <div css={loadingStyle}>
        <img css={loadingGifStyle} src={loadingGif} alt="Loading..." />
      </div>
    );

  if (!items || items.length === 0)
    return (
      <div css={noItemsDiv}>
        <p css={noItemsText}>{NO_ITEMS_MESSAGE}</p>
      </div>
    );

  return (
    <div css={divCover}>
      <div css={divItemList}>
        {items.map((item) => {
          return (
            <div key={item.id} css={linkStyle} onClick={() => goOrder(item.id)}>
              <div css={itemBox}>
                <img css={itemImgStyle} src={item.imageURL} alt={item.name} />
                <div css={spacer12} />
                <p css={brandP}>{item.brandInfo.name}</p>
                <h6 css={itemNameH6}>{item.name}</h6>
                <div css={spacer4} />
                <p css={priceP}>{item.price.sellingPrice.toLocaleString()}원</p>
              </div>
            </div>
          );
        })}
      </div>
      {hasMore && (
        <div css={bottomLoading} ref={hasMore ? lastRef : undefined}>
          <img
            css={loadingGifStyle}
            src={loadingGif}
            alt="상품을 불러오는 중입니다..."
          />
        </div>
      )}
    </div>
  );
};

export default ThemeItemList;
