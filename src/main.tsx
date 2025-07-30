import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@src/App.tsx';
import '@src/styles/reset.css';

import { UserInfoProvider } from '@src/contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';

createRoot(document.getElementById('root')!).render(
  <UserInfoProvider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </UserInfoProvider>
);
