import theme from '@/styles/tokens';
import { css } from '@emotion/react';
import loadingGif from '@src/assets/icons/loading.gif';
import ThemeItemList from '@/components/ThemeItemList';
import { useParams } from 'react-router-dom';
import { useThemeInfo } from '@/hooks/useThemeInfo';

const backgroundStyle = css`
  max-width: 720px;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.backgroundDefault};
`;
const contentsStyle = css`
  width: 100%;
  height: 100%;
`;

const getDynamicSectionStyle = (backgroundColor: string) => css`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: ${backgroundColor};
  box-sizing: border-box;
`;

const sectionTitleP = css`
  font-size: ${theme.typography.subtitle2Bold.fontSize};
  font-weight: ${theme.typography.subtitle2Bold.fontWeight};
  line-height: ${theme.typography.subtitle2Bold.lineHeight};
  color: ${theme.colors.gray100};
  margin: 0px;
  text-align: left;
`;

const sectionSubtitleH5 = css`
  font-size: ${theme.typography.title1Bold.fontSize};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  line-height: ${theme.typography.title1Bold.lineHeight};
  color: ${theme.colors.backgroundDefault};
  margin: 0px;
  text-align: left;
`;
const sectionTextP = css`
  font-size: ${theme.typography.body1Regular.fontSize};
  font-weight: ${theme.typography.body1Regular.fontWeight};
  line-height: ${theme.typography.body1Regular.lineHeight};
  color: ${theme.colors.gray200};
  margin: 0px;
  text-align: left;
`;
const spacer8 = css`
  width: 100%;
  height: ${theme.spacing.spacing2};
  background-color: transparent;
`;
const spacer4 = css`
  width: 100%;
  height: ${theme.spacing.spacing1};
  background-color: transparent;
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

const ThemeItemListPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { themeInfo, loading } = useThemeInfo(themeId);

  if (loading || !themeInfo) {
    return (
      <div css={loadingStyle}>
        <img css={loadingGifStyle} src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  return (
    <div css={backgroundStyle}>
      <div css={contentsStyle}>
        <section css={getDynamicSectionStyle(themeInfo.backgroundColor)}>
          <p css={sectionTitleP}>{themeInfo.name}</p>
          <div css={spacer8} />
          <h5 css={sectionSubtitleH5}>{themeInfo.title}</h5>
          <div css={spacer4} />
          <p css={sectionTextP}>{themeInfo.description}</p>
        </section>
        <ThemeItemList />
      </div>
    </div>
  );
};

export default ThemeItemListPage;
