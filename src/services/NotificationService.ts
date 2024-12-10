import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { format, addMinutes } from 'date-fns';
import { ChurchEvent, CHURCH_EVENTS_2025 } from './ChurchCalendarService';

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
  }

  configure = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('church-events', {
        name: 'Church Events',
        description: 'Church calendar events and reminders',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#831B26',
      });

      // Additional channel for urgent notifications
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

  scheduleChurchEvent = async (event: ChurchEvent, notifyBefore: number = 60) => {
    const [hours, minutes] = event.time.split(':').map(Number);
    const eventDate = new Date(event.date);
    eventDate.setHours(hours, minutes);

    const notificationTime = addMinutes(eventDate, -notifyBefore);
    const identifier = `${event.date.getTime()}-${event.serviceType}-${notifyBefore}`;

    let message = `${event.name} започнува за ${notifyBefore === 1440 ? '24 часа' : '1 час'}`;
    
    // Add location info for picnics and special events
    if (event.serviceType === 'PICNIC' && event.description) {
      message += `\nЛокација: ${event.description}`;
    }

    await this.scheduleNotification({
      title: event.name,
      message,
      date: notificationTime,
      identifier,
      urgent: event.serviceType === 'PICNIC',
    });
  };

  scheduleChurchEvents = async () => {
    // Cancel all existing notifications before scheduling new ones
    await this.cancelAllNotifications();

    // Schedule each event with both day-before and hour-before notifications
    for (const event of CHURCH_EVENTS_2025) {
      // 24-hour notification
      await this.scheduleChurchEvent(event, 1440);
      
      // 1-hour notification
      await this.scheduleChurchEvent(event, 60);
    }
  };

  cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  cancelNotification = async (identifier: string) => {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  };
}

export default new NotificationService(); 