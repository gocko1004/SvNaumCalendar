import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminStackParamList } from './types';
import { 
  AdminLoginScreen,
  AdminDashboardScreen,
  ManageCalendarScreen,
  ManageLocationsScreen,
  SpecialEventsScreen 
} from '../admin/screens';
import { EventFormScreen } from '../screens/EventFormScreen';
import { COLORS } from '../constants/theme';

const AdminStack = createNativeStackNavigator<AdminStackParamList>();

export const AdminNavigator = () => {
  return (
    <AdminStack.Navigator
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
      <AdminStack.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ title: 'Админ Панел' }}
      />
      <AdminStack.Screen
        name="ManageCalendar"
        component={ManageCalendarScreen}
        options={{ title: 'Годишен Календар' }}
      />
      <AdminStack.Screen
        name="AddEvent"
        component={EventFormScreen}
        options={{ title: 'Додади Настан' }}
      />
      <AdminStack.Screen
        name="ManageLocations"
        component={ManageLocationsScreen}
        options={{ title: 'Локации' }}
      />
      <AdminStack.Screen
        name="SpecialEvents"
        component={SpecialEventsScreen}
        options={{ title: 'Специјални Настани' }}
      />
    </AdminStack.Navigator>
  );
}; 