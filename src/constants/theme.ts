import { DefaultTheme } from 'react-native-paper';

export const COLORS = {
  PRIMARY: '#831B26',    // Deep Red
  SECONDARY: '#F2A333',  // Gold
  BACKGROUND: '#FAFAFA', // Light Gray
  TEXT: '#000000',
  ERROR: '#FF3B30',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  SURFACE: '#FFFFFF',
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.PRIMARY,
    accent: COLORS.SECONDARY,
    background: COLORS.BACKGROUND,
    surface: COLORS.SURFACE,
    error: COLORS.ERROR,
    text: COLORS.TEXT,
  },
  roundness: 8,
};

export const navigationTheme = {
  dark: false,
  colors: {
    primary: COLORS.PRIMARY,
    background: COLORS.BACKGROUND,
    card: COLORS.SURFACE,
    text: COLORS.TEXT,
    border: COLORS.BACKGROUND,
    notification: COLORS.PRIMARY,
  },
}; 