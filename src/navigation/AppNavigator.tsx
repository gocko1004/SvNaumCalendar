import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import { CalendarScreen } from '../screens/CalendarScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { AdminNavigator } from './AdminNavigator';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: COLORS.PRIMARY,
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{
        title: 'Годишен План 2025 година',
        tabBarIcon: ({ color, size }) => (
          <Icon name="calendar" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={NotificationSettingsScreen}
      options={{
        title: 'Поставки',
        tabBarIcon: ({ color, size }) => (
          <Icon name="cog" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Admin"
      component={AdminNavigator}
      options={{
        headerShown: false,
        title: 'Админ',
        tabBarIcon: ({ color, size }) => (
          <Icon name="shield-account" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}; 