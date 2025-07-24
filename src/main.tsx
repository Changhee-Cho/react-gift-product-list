import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from '@src/App.tsx';
import '@src/styles/reset.css';

import { UserInfoProvider } from '@src/contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <UserInfoProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </UserInfoProvider>
  </QueryClientProvider>
);
