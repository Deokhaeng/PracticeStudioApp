import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMain from './AppMain';
import styled from 'styled-components/native';
import Auth from './Auth';
import { Typo } from '@components/index';
import ProfileIcon from '@assets/image/icon-profile.svg';
import useTheme from '@theme/useTheme';

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

  function HeaderTitle() {
    return <Header.Typo>Practice Studio</Header.Typo>;
  }

  function ProfileBtton() {
    return (
      <Header.Button>
        <ProfileIcon fill={theme.colors.BLACK} />
      </Header.Button>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="">
          <Stack.Screen
            name="Auth"
            options={{
              animationEnabled: false,
              headerTitle: '',
            }}
            component={Auth}
          />
          <Stack.Screen
            name="AppMain"
            options={{
              animationEnabled: true,
              headerTitle: '',
              headerLeft: HeaderTitle,
              headerRight: ProfileBtton,
            }}
            component={AppMain}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
