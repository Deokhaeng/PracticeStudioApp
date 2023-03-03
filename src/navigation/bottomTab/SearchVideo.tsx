import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchVideoScreen } from '@screens/searchVideo';

export default function SearchVideo() {
  const SearchVideoStack = createStackNavigator();

  return (
    <SearchVideoStack.Navigator
      initialRouteName="SearchVideo"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
      }}
    >
      <SearchVideoStack.Screen
        name="SearchVideoScreen"
        component={SearchVideoScreen}
        options={{
          headerShown: false,
        }}
      />
    </SearchVideoStack.Navigator>
  );
}
