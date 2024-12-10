import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminStackParamList } from './types';
import { AdminLoginScreen } from '../admin/screens/AdminLoginScreen';
import { AdminDashboardScreen } from '../admin/screens/AdminDashboardScreen';
import { SpecialEventsScreen } from '../admin/screens/SpecialEventsScreen';
import { ManageLocationsScreen } from '../admin/screens/ManageLocationsScreen';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator<AdminStackParamList>();

export const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="AdminLogin" 
        component={AdminLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AdminDashboard" 
        component={AdminDashboardScreen}
        options={{ title: 'Администраторски Панел' }}
      />
      <Stack.Screen 
        name="SpecialEvents" 
        component={SpecialEventsScreen}
        options={{ title: 'Специјални Настани' }}
      />
      <Stack.Screen 
        name="ManageLocations" 
        component={ManageLocationsScreen}
        options={{ title: 'Локации' }}
      />
    </Stack.Navigator>
  );
}; 