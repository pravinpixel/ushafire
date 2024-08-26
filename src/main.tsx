import { Toaster } from 'sonner';
import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PROJECT_CONSTANTS } from 'helper/GlobalHelper.ts';

import './index.css';
import App from './App.tsx';
import useSocketStore from './zustand-config/SocketZustand.ts';

// Create a client

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: PROJECT_CONSTANTS.CACHE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

// function ErrorFallback({
//   error,
// }: {
//   error: {
//     message: string;
//   };
// }) {
//   // eslint-disable-next-line no-console
//   return <>{import.meta.env.DEV ? error?.message || '' : ''}</>;
// }

const ReactComponent = () => {
  const connectSocket = useSocketStore((state) => state.socketEmits);
  useEffect(() => {
    //Socket Connection for Push Notification
    connectSocket();
  }, [connectSocket]);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
        <Toaster position="top-center" richColors />
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </ErrorBoundary> */}
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<ReactComponent />);
