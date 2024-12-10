export const CONFIG = {
  APP_NAME: 'Sv Naum Calendar',
  VERSION: '1.0.0',
  
  // API Configuration
  API_URL: process.env.API_URL || 'https://api.example.com',
  API_TIMEOUT: 10000, // 10 seconds
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: '@auth_token',
    USER_SETTINGS: '@user_settings',
    NOTIFICATIONS: '@notifications_settings',
  },
  
  // Theme Colors
  COLORS: {
    PRIMARY: '#007AFF',
    SECONDARY: '#5856D6',
    SUCCESS: '#34C759',
    DANGER: '#FF3B30',
    WARNING: '#FF9500',
    INFO: '#5AC8FA',
    LIGHT: '#F2F2F7',
    DARK: '#1C1C1E',
  },
  
  // Default Settings
  DEFAULTS: {
    NOTIFICATIONS: {
      EVENT_REMINDERS: true,
      DAILY_DIGEST: false,
      WEEKLY_NEWSLETTER: true,
    },
    CALENDAR: {
      DEFAULT_VIEW: 'month',
      FIRST_DAY: 1, // Monday
      SHOW_WEEK_NUMBERS: true,
    },
  },
  
  // Feature Flags
  FEATURES: {
    ENABLE_PUSH_NOTIFICATIONS: true,
    ENABLE_CALENDAR_SYNC: true,
    ENABLE_SOCIAL_SHARING: true,
  },
}; 