import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import AppRouter from '@navigation/AppRouter';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import theme from '@theme/index';

const AppLayout = styled.View({
  flex: 1,
  backgroundColor: '#fff',
  // backgroundColor: theme.colors.BACKGROUND,
});

export default function App() {
  const reactQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={reactQueryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <AppLayout>
            <AppRouter />
          </AppLayout>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
