import {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_ACCESS_TOKEN
} from '@env';

export const CONFIG = {
  APP_NAME: 'Sv Naum Calendar',
  VERSION: '1.0.0',
  
  // API Configuration
  API: {
    BASE_URL: 'https://mpc-triengen.ch/api',
    ENDPOINTS: {
      POSTS: '/posts',
      EVENTS: '/events',
      NOTIFICATIONS: '/notifications',
    },
    AUTH_TOKEN: 'your-api-token',
    TIMEOUT: 10000, // 10 seconds
  },
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: '@auth_token',
    USER_SETTINGS: '@user_settings',
    NOTIFICATIONS: '@notifications_settings',
  },
  
  // Social Media URLs and Configuration
  SOCIAL_MEDIA: {
    FACEBOOK_GROUP: 'https://www.facebook.com/groups/Mpctriengen/',
    WEBSITE: 'https://mpc-triengen.ch',
    FACEBOOK: {
      APP_ID: FACEBOOK_APP_ID || '',
      APP_SECRET: FACEBOOK_APP_SECRET || '',
      GROUP_ID: '', // Will be configured later
      ACCESS_TOKEN: FACEBOOK_ACCESS_TOKEN || '',
    },
    AUTO_POST: {
      ENABLED: false, // Disabled for now
      PLATFORMS: {
        FACEBOOK: false, // Disabled for now
        WEBSITE: false,  // Disabled for now
      },
    },
  },
  
  // Theme Colors
  COLORS: {
    PRIMARY: '#831B26',
    SECONDARY: '#F2A333',
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
    ENABLE_SOCIAL_SHARING: false, // Disabled for now
  },
}; 