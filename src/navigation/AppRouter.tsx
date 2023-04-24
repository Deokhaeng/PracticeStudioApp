import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMain from './AppMain';
import styled from 'styled-components/native';
import Auth from './Auth';
import { Typo } from '@components/common';
import ProfileIcon from '@assets/image/icon-profile.svg';
import { VideoPlayerScreen } from '@screens/videoPlayer';
import { ProfileScreen, ProfileSettingScreen } from '@screens/profile';
import { NavigationProps } from '~types/navigationTypes';
import theme from '@theme/index';

const Header = {
  Typo: styled(Typo.Normal_5)({
    fontWeight: 500,
    marginLeft: 18,
  }),
  Button: styled.TouchableOpacity({
    marginRight: 20,
  }),
};

const AppRouter: FC = () => {
  const Stack = createStackNavigator();

  const HeaderTitle: FC = () => {
    return <Header.Typo>Practice Studio</Header.Typo>;
  };

  const ProfileButton = () => {
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
              headerLeft: HeaderTitle,
              headerRight: ProfileButton,
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
              headerRight: ProfileButton,
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
          <Stack.Screen
            name="ProfileSettingScreen"
            options={() => ({
              animationEnabled: true,
              headerTitle: '',
              headerShown: false,
              headerLeft: HeaderTitle,
            })}
            component={ProfileSettingScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppRouter;
