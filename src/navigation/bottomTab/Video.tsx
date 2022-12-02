import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { VideoScreen } from '@screens/index';

export default function Video() {
  const VideoStack = createStackNavigator();

  return (
    <VideoStack.Navigator
      initialRouteName="Video"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
      }}>
      <VideoStack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          headerShown: false,
        }}
      />
    </VideoStack.Navigator>
  );
}
