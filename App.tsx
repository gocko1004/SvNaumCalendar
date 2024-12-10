import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { RootStackParamList, MainTabParamList } from './src/navigation/types';
import { theme, navigationTheme } from './src/constants/theme';
import NotificationService from './src/services/NotificationService';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { AdminNavigator } from './src/navigation/AdminNavigator';

// Screens
import { CalendarScreen } from './src/screens/CalendarScreen';
import { EventFormScreen } from './src/screens/EventFormScreen';
import { NotificationSettingsScreen } from './src/screens/NotificationSettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
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

export default function App() {
  useEffect(() => {
    // Schedule predefined church events when the app starts
    NotificationService.scheduleChurchEvents();
  }, []);

  return (
    <LanguageProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Admin" component={AdminNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </LanguageProvider>
  );
} 