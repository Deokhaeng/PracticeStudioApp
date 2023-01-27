import React from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMain from './AppMain';
import styled from 'styled-components/native';
import Auth from './Auth';
import { Typo } from '@components/common';
import ProfileIcon from '@assets/image/icon-profile.svg';
import useTheme from '@theme/useTheme';
import { useRecoilValue } from 'recoil';
import { navigationState } from '@atoms/navigationState';
import { VideoPlayerScreen } from '@screens/videoPlayer';
import { ProfileScreen } from '@screens/profile';
import { NavigationProps } from '~types/navigationTypes';

const Header = {
  Typo: styled(Typo.Normal_5)({
    fontWeight: 500,
    marginLeft: 18,
  }),
  Button: styled.TouchableOpacity({
    marginRight: 20,
  }),
};

export default function AppRouter() {
  const theme = useTheme();
  const Stack = createStackNavigator();
  const presentNavigationState = useRecoilValue(navigationState);
  // const route = useRoute();

  console.log('presentNavigationState', presentNavigationState);

  const HeaderTitle = () => {
    const route = useRoute();
    console.log('route', route);
    return <Header.Typo>Practice Studio</Header.Typo>;
  };

  const ProfileBtton = () => {
    const navigation = useNavigation<NavigationProps>();
    return (
      <Header.Button onPress={() => navigation.push('ProfileScreen', {})}>
        <ProfileIcon fill={theme.colors.BLACK} />
      </Header.Button>
    );
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="">
          <Stack.Screen
            name="Auth"
            options={{
              animationEnabled: false,
              headerTitle: '',
              headerShown: false,
            }}
            component={Auth}
          />
          <Stack.Screen
            name="AppMain"
            options={{
              animationEnabled: true,
              headerTitle: '',
              // headerShown: presentNavigationState === 'videoScreen' && false,
              headerLeft: HeaderTitle,
              headerRight: ProfileBtton,
            }}
            component={AppMain}
          />
          <Stack.Screen
            name="VideoPlayerScreen"
            options={{
              animationEnabled: true,
              headerTitle: '',
              headerShown: false,
              headerLeft: HeaderTitle,
              headerRight: ProfileBtton,
            }}
            component={VideoPlayerScreen}
          />
          <Stack.Screen
            name="ProfileScreen"
            options={() => ({
              animationEnabled: true,
              headerTitle: '',
              headerShown: false,
              headerLeft: HeaderTitle,
            })}
            component={ProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
