import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import AppRouter from '@navigation/AppRouther';
import useTheme from '@theme/useTheme';
import SplashScreen from 'react-native-splash-screen';

const AppLayout = styled(View)({
  flex: 1,
  backgroundColor: '#fff',
  // backgroundColor: theme.colors.BACKGROUND,
});

export default function App() {
  const theme = useTheme();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </ThemeProvider>
  );
}
