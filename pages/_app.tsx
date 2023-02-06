import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import AlertContextProvider from '../components/ui-kit/AlertProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <AlertContextProvider>
          <Component {...pageProps} />
        </AlertContextProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}
