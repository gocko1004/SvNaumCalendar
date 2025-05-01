import { ChurchEvent, CHURCH_EVENTS_2025 } from './ChurchCalendarService';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { format, addMinutes, addDays, isBefore, addYears, isAfter } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocialMediaService from './SocialMediaService';

const NOTIFICATION_SETTINGS_KEY = '@notification_settings';
const LAST_SCHEDULE_CHECK = '@last_schedule_check';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  constructor() {
    this.configure();
    this.setupYearlyScheduling();
  }

  setupYearlyScheduling = async () => {
    // Check if we need to schedule for the next year
    const lastCheck = await AsyncStorage.getItem(LAST_SCHEDULE_CHECK);
    const now = new Date();
    const lastCheckDate = lastCheck ? new Date(lastCheck) : null;

    // If we haven't checked this year or it's the first time
    if (!lastCheckDate || isAfter(now, addYears(lastCheckDate, 1))) {
      await this.scheduleYearEvents();
      await AsyncStorage.setItem(LAST_SCHEDULE_CHECK, now.toISOString());
    }

    // Set up daily check for next year's events
    this.setupDailyCheck();
  };

  setupDailyCheck = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // Schedule the first check
    setTimeout(async () => {
      await this.checkAndScheduleNextYear();
      // Then set up daily checks
      setInterval(this.checkAndScheduleNextYear, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
  };

  checkAndScheduleNextYear = async () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // If we're in December, schedule next year's events
    if (now.getMonth() === 11) {
      const events = this.generateNextYearEvents(currentYear + 1);
      await this.scheduleEventsForYear(events);
      await AsyncStorage.setItem(LAST_SCHEDULE_CHECK, now.toISOString());
    }
  };

  generateNextYearEvents = (year: number): ChurchEvent[] => {
    // Create next year's events based on this year's dates
    return CHURCH_EVENTS_2025.map(event => {
      const newDate = new Date(event.date);
      newDate.setFullYear(year);
      return {
        ...event,
        date: newDate
      };
    });
  };

  scheduleYearEvents = async () => {
    try {
      const settings = await this.getNotificationSettings();
      if (!settings.enabled) return;

      // Cancel existing notifications to avoid duplicates
      await this.cancelAllNotifications();

      const now = new Date();
      const nextYear = addYears(now, 1);

      // Schedule current year's remaining events
      const currentYearEvents = CHURCH_EVENTS_2025.filter(event => {
        const eventDate = new Date(event.date);
        return isAfter(eventDate, now) && isBefore(eventDate, nextYear);
      });

      await this.scheduleEventsForYear(currentYearEvents);

      // Schedule next year's events if we're in the last month
      if (now.getMonth() === 11) {
        const nextYearEvents = this.generateNextYearEvents(now.getFullYear() + 1);
        await this.scheduleEventsForYear(nextYearEvents);
      }
    } catch (error) {
      console.error('Error scheduling yearly events:', error);
    }
  };

  scheduleEventsForYear = async (events: ChurchEvent[]) => {
    const settings = await this.getNotificationSettings();

    for (const event of events) {
      if (settings.weekBefore) {
        await this.scheduleEventReminder(event, 7 * 24 * 60); // Week before
      }
      if (settings.dayBefore) {
        await this.scheduleEventReminder(event, 24 * 60); // Day before
      }
      if (settings.hourBefore) {
        await this.scheduleEventReminder(event, 60); // Hour before
      }
    }
  };

  scheduleEventReminder = async (event: ChurchEvent, minutesBefore: number) => {
    const [hours, minutes] = event.time.split(':').map(Number);
    const eventDate = new Date(event.date);
    eventDate.setHours(hours, minutes);

    const notificationTime = addMinutes(eventDate, -minutesBefore);
    const identifier = `${event.date.getTime()}-${event.serviceType}-${minutesBefore}`;

    // Don't schedule if the notification time is in the past
    if (isBefore(notificationTime, new Date())) return;

    let message = '';
    let notificationType: 'week' | 'day' | 'hour' | null = null;

    if (minutesBefore === 60) {
      message = `${event.name} започнува за 1 час`;
      notificationType = 'hour';
    } else if (minutesBefore === 24 * 60) {
      message = `${event.name} е утре во ${event.time}`;
      notificationType = 'day';
    } else if (minutesBefore === 7 * 24 * 60) {
      message = `${event.name} е следната недела во ${event.time}`;
      notificationType = 'week';
    }

    if (event.serviceType === 'PICNIC' && event.description) {
      message += `\nЛокација: ${event.description}`;
    }

    // Schedule the notification
    await this.scheduleNotification({
      title: event.name,
      message,
      date: notificationTime,
      identifier,
      urgent: event.serviceType === 'PICNIC',
    });

    // Post to social media if it's a notification type we want to share
    if (notificationType) {
      try {
        await SocialMediaService.postEventToSocialMedia(event, notificationType);
      } catch (error) {
        console.error('Error posting to social media:', error);
      }
    }
  };

  configure = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('church-events', {
        name: 'Church Events',
        description: 'Church calendar events and reminders',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#831B26',
      });

      await Notifications.setNotificationChannelAsync('urgent-updates', {
        name: 'Urgent Updates',
        description: 'Important church updates and announcements',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF0000',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
    }
  };

  getNotificationSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
      return settings ? JSON.parse(settings) : {
        enabled: true,
        dayBefore: true,
        hourBefore: true,
        weekBefore: false,
      };
    } catch (error) {
      console.error('Error getting notification settings:', error);
      return {
        enabled: true,
        dayBefore: true,
        hourBefore: true,
        weekBefore: false,
      };
    }
  };

  updateNotificationSettings = async (settings: {
    enabled: boolean;
    dayBefore: boolean;
    hourBefore: boolean;
    weekBefore: boolean;
  }) => {
    try {
      await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
      if (settings.enabled) {
        await this.scheduleYearEvents();
      } else {
        await this.cancelAllNotifications();
      }
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  scheduleNotification = async (reminder: {
    title: string;
    message: string;
    date: Date;
    identifier?: string;
    urgent?: boolean;
  }) => {
    const { title, message, date, identifier, urgent } = reminder;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
        sound: true,
        priority: urgent ? Notifications.AndroidNotificationPriority.MAX : Notifications.AndroidNotificationPriority.DEFAULT,
      },
      trigger: {
        date,
        channelId: urgent ? 'urgent-updates' : 'church-events',
      },
      identifier,
    });
  };

  sendCustomNotification = async (notification: {
    title: string;
    message: string;
    date?: Date;
    urgent?: boolean;
  }) => {
    const { title, message, date = new Date(), urgent = true } = notification;

    await this.scheduleNotification({
      title,
      message,
      date,
      urgent,
      identifier: `custom-${Date.now()}`,
    });
  };

  cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  cancelNotification = async (identifier: string) => {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  };
}

export default new NotificationService(); 