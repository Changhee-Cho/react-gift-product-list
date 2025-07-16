import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import theme from '@src/styles/tokens/index';
import loadingGif from '@src/assets/icons/loading.gif';
import { fetchThemes } from '@/apis/themeApi';

const divStyle = css`
  width: 100%;
  height: 24px;
  background: transparent;
`;

const themeStyle = css`
  padding: 8px;
`;

const themeTitleDiv = css`
  padding: 0px 8px 20px;
`;

const titleTextStyle = css`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: ${theme.colors.textDefault};
  margin: 0px;
  width: 100%;
  text-align: left;
`;

const itemsBox = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 4px;
`;

const itemDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  cursor: pointer;
`;

const itemImage = css`
  max-width: 3.125rem;
  max-height: 3.125rem;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  overflow: hidden;
`;

const itemBoxText = css`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1rem;
  color: ${theme.colors.textDefault};
  margin: 0px;
  text-align: left;
`;

const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  height: 320px;
  padding: 8px;
`;

const loadingGifStyle = css`
  width: 50px;
`;

const Maintheme = () => {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const getThemes = async () => {
      try {
        setStatus({ loading: true, error: false });
        const data = await fetchThemes();
        setCategories(data);
        setStatus({ loading: false, error: false });
      } catch (error) {
        setStatus({ loading: false, error: true });
      }
    };

    getThemes();
  }, []);

  if (status.loading) {
    return (
      <div css={loadingStyle}>
        <img css={loadingGifStyle} src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  if (status.error || categories.length === 0) {
    return null;
  }

  return (
    <>
      <div css={divStyle} />
      <section css={themeStyle}>
        <div css={themeTitleDiv}>
          <h3 css={titleTextStyle}>선물 테마</h3>
        </div>
        <div css={itemsBox}>
          {categories.map(({ themeId, name, image }) => (
            <div key={themeId} css={itemDiv}>
              <img css={itemImage} src={image} alt={name} />
              <p css={itemBoxText}>{name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Maintheme;
