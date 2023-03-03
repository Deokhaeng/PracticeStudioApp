import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarScreen } from '@screens/calendar';

export default function Calendar() {
  const CalendarStack = createStackNavigator();

  return (
    <CalendarStack.Navigator
      initialRouteName="Rank"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
      }}
    >
      <CalendarStack.Screen
        name="SearchVideoScreen"
        component={CalendarScreen}
        options={{
          headerShown: false,
        }}
      />
    </CalendarStack.Navigator>
  );
}
