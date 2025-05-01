import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/constants/theme';
import NotificationService from './src/services/NotificationService';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    // Initialize notifications when the app starts
    const initializeApp = async () => {
      try {
        await NotificationService.configure();
        await NotificationService.scheduleYearEvents();
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    
    initializeApp();
  }, []);

  return (
    <LanguageProvider>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </LanguageProvider>
  );
} 