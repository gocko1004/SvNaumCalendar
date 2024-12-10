import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, List, FAB, Portal, Dialog, TextInput } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdminStackParamList } from '../../navigation/types';
import { COLORS } from '../../constants/theme';
import NotificationService from '../../services/NotificationService';

type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<AdminStackParamList, 'AdminDashboard'>;
};

export const AdminDashboardScreen = ({ navigation }: AdminDashboardScreenProps) => {
  const { logout } = useAuth();
  const [notificationDialogVisible, setNotificationDialogVisible] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState('');

  const navigateToSection = (section: keyof AdminStackParamList) => {
    navigation.navigate(section as any);
  };

  const sendCustomNotification = async () => {
    try {
      await NotificationService.sendCustomNotification({
        title: 'Important Church Update',
        message: notificationMessage,
        date: new Date(Date.now() + 1000), // Send immediately
      });
      setNotificationDialogVisible(false);
      setNotificationMessage('');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Title style={styles.title}>Администраторски Панел</Title>
        
        <View style={styles.grid}>
          <Card style={styles.card} onPress={() => navigateToSection('ManageEvents')}>
            <Card.Content>
              <Title>Настани</Title>
              <Paragraph>Управувај со црковни настани и календар</Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.card} onPress={() => navigateToSection('ManageNotifications')}>
            <Card.Content>
              <Title>Известувања</Title>
              <Paragraph>Управувај со известувања и билтени</Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.card} onPress={() => navigateToSection('ManageUsers')}>
            <Card.Content>
              <Title>Корисници</Title>
              <Paragraph>Управувај со кориснички сметки</Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.card} onPress={() => navigateToSection('Settings')}>
            <Card.Content>
              <Title>Поставки</Title>
              <Paragraph>Конфигурирај ги поставките на апликацијата</Paragraph>
            </Card.Content>
          </Card>
        </View>

        <List.Section>
          <List.Subheader>Брзи Акции</List.Subheader>
          <List.Item
            title="Креирај Нов Настан"
            description="Додај нов настан во календарот"
            left={props => <List.Icon {...props} icon="calendar-plus" />}
            onPress={() => navigateToSection('CreateEvent')}
          />
          <List.Item
            title="Испрати Известување"
            description="Испрати итно известување до сите корисници"
            left={props => <List.Icon {...props} icon="bell-ring" />}
            onPress={() => setNotificationDialogVisible(true)}
          />
          <List.Item
            title="Ажурирај Локација"
            description="Додај или измени локација за настан"
            left={props => <List.Icon {...props} icon="map-marker" />}
            onPress={() => navigateToSection('ManageLocations')}
          />
          <List.Item
            title="Специјални Настани"
            description="Управувај со пикници и специјални собири"
            left={props => <List.Icon {...props} icon="star" />}
            onPress={() => navigateToSection('SpecialEvents')}
          />
        </List.Section>

        <Button
          mode="outlined"
          onPress={logout}
          style={styles.logoutButton}
        >
          Одјави се
        </Button>
      </ScrollView>

      <Portal>
        <Dialog
          visible={notificationDialogVisible}
          onDismiss={() => setNotificationDialogVisible(false)}
        >
          <Dialog.Title>Испрати Известување</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Порака"
              value={notificationMessage}
              onChangeText={setNotificationMessage}
              multiline
              numberOfLines={3}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setNotificationDialogVisible(false)}>Откажи</Button>
            <Button onPress={sendCustomNotification}>Испрати</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigateToSection('CreateEvent')}
        label="Нов Настан"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24,
    color: COLORS.PRIMARY,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    marginBottom: 16,
    elevation: 2,
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.PRIMARY,
  },
}); 