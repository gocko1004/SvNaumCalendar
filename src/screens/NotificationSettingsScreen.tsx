import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Title, ActivityIndicator, Snackbar } from 'react-native-paper';
import { useNotificationSettings } from '../hooks/useNotificationSettings';

export const NotificationSettingsScreen = () => {
  const { enabled, loading, error, toggleNotifications } = useNotificationSettings();
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const handleSettingChange = async (
    setter: (value: boolean) => Promise<void>,
    value: boolean,
    settingName: string
  ) => {
    await setter(value);
    setSnackbarVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Notification Settings</Title>
      <List.Section>
        <List.Item
          title="Event Reminders"
          description="Receive notifications before events"
          right={() => (
            <Switch
              value={enabled}
              onValueChange={(value) =>
                handleSettingChange(toggleNotifications, value, 'Event Reminders')
              }
            />
          )}
        />
        <List.Item
          title="Daily Digest"
          description="Get a summary of upcoming events"
          right={() => (
            <Switch
              value={enabled}
              onValueChange={(value) =>
                handleSettingChange(toggleNotifications, value, 'Daily Digest')
              }
            />
          )}
        />
        <List.Item
          title="Weekly Newsletter"
          description="Receive weekly updates and featured events"
          right={() => (
            <Switch
              value={enabled}
              onValueChange={(value) =>
                handleSettingChange(toggleNotifications, value, 'Weekly Newsletter')
              }
            />
          )}
        />
      </List.Section>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        Settings updated successfully
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
  },
}); 