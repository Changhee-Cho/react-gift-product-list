import Router from '@src/router/Router';
import Background, { Inner } from '@src/components/Background';
import Title from '@src/components/Title';
import { ToastContainer } from 'react-toastify';
import { css } from '@emotion/react';
import 'react-toastify/dist/ReactToastify.css';

const mainStyle = css`
  padding-top: 2.75rem;
`;

const App = () => {
  return (
    <Background>
      <Inner>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <header>
          <Title />
        </header>
        <main css={mainStyle}>
          <Router />
        </main>
      </Inner>
    </Background>
  );
};

export default App;
