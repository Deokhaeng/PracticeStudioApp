import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInMainScreen } from '@screens/auth';
import useAutoLogin from '@hooks/auth/useAutoLogin';

export default function Auth() {
  const AuthStack = createStackNavigator();
  useAutoLogin();

  return (
    <AuthStack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
      }}
    >
      <AuthStack.Screen
        name="SignInMainScreen"
        component={SignInMainScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
}
