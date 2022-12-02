import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Calendar, Rank, SearchVideo, Video } from './bottomTab';
import VideoIcon from '@assets/image/icon-video.svg';
import SearchVideoIcon from '@assets/image/icon-search-video.svg';
import CalendarIcon from '@assets/image/icon-calendar.svg';
import RankIcon from '@assets/image/icon-rank.svg';
import useTheme from '@theme/useTheme';
import isAndroid from '@utils/isAndroid';

const BottomTab = createBottomTabNavigator();

export default function AppMain() {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.PRIMARY,
        tabBarInactiveTintColor: theme.colors.BLACK,

        tabBarStyle: {
          height: isAndroid ? 60 : 90,
        },
      }}>
      <BottomTab.Screen
        name="Videos"
        component={Video}
        options={{
          tabBarLabel: 'Videos',
          tabBarAccessibilityLabel: 'Videos',
          tabBarIcon: ({ color }) => <VideoIcon width={35} height={35} fill={color} />,
        }}
      />
      <BottomTab.Screen
        name="SearchVideo"
        component={SearchVideo}
        options={{
          tabBarLabel: 'Search',
          tabBarAccessibilityLabel: 'Search',
          tabBarIcon: ({ color }) => <SearchVideoIcon width={35} height={35} fill={color} />,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarAccessibilityLabel: 'Calendar',
          tabBarIcon: ({ color }) => <CalendarIcon width={35} height={35} fill={color} />,
        }}
      />
      <BottomTab.Screen
        name="Rank"
        component={Rank}
        options={{
          tabBarLabel: 'Ranking',
          tabBarAccessibilityLabel: 'Ranking',
          tabBarIcon: ({ color }) => <RankIcon width={35} height={35} fill={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
