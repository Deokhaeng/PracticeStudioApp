import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const SplashContainer = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

// interface SplashScreenPros {
//   props?: any;
// }
type SplashScreenProps = {
  navigation: any;
};

export default function SplashScreen(props: SplashScreenProps) {
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 1500);
  }, []);

  useEffect(() => {
    if (authLoaded) {
      props.navigation.replace('Practive Studio');
    }
  }, [authLoaded, props.navigation]);

  return (
    <SplashContainer>
      <Text>Splash Screen</Text>
    </SplashContainer>
  );
}
