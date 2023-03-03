import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { VideoContentsScreen } from '@screens/video';

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
      }}
    >
      <VideoStack.Screen
        name="VideoContentScreen"
        component={VideoContentsScreen}
        options={{
          headerShown: false,
        }}
      />
    </VideoStack.Navigator>
  );
}
