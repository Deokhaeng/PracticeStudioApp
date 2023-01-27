import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RankScreen } from '@screens/rank';

export default function Rank() {
  const RankStack = createStackNavigator();

  return (
    <RankStack.Navigator
      initialRouteName="Rank"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
      }}
    >
      <RankStack.Screen
        name="RankScreen"
        component={RankScreen}
        options={{
          headerShown: false,
        }}
      />
    </RankStack.Navigator>
  );
}
