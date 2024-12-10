import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../hooks/useAuth';

// Screens
import { CalendarScreen } from '../screens/CalendarScreen';
import { EventFormScreen } from '../screens/EventFormScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { AdminLoginScreen } from '../admin/screens/AdminLoginScreen';
import { AdminDashboardScreen } from '../admin/screens/AdminDashboardScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="calendar" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Add Event"
      component={EventFormScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="plus" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={NotificationSettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="cog" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AdminStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="AdminLogin" 
      component={AdminLoginScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="AdminDashboard" 
      component={AdminDashboardScreen} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Admin" component={AdminStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 