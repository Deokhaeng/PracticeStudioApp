import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInMainScreen } from '@screens/index';

export default function Auth() {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
      }}>
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
