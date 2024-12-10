import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { TextInput, Button, Title, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useLanguage } from '../contexts/LanguageContext';
import { COLORS } from '../constants/theme';

export const EventFormScreen = () => {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      setSnackbarMessage('Пополнете ги сите полиња');
      setSnackbarVisible(true);
      return;
    }

    try {
      // TODO: Implement event saving logic
      setSnackbarMessage(t.eventSaved);
      setSnackbarVisible(true);
      
      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setDate(new Date());
      setTime(new Date());
    } catch (error) {
      setSnackbarMessage('Грешка при зачувување на настанот');
      setSnackbarVisible(true);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>{t.addEvent}</Title>

      <TextInput
        label={t.eventTitle}
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        label={t.eventDescription}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        {format(date, 'dd.MM.yyyy')}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      <Button
        mode="outlined"
        onPress={() => setShowTimePicker(true)}
        style={styles.input}
      >
        {format(time, 'HH:mm')}
      </Button>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      <TextInput
        label={t.eventLocation}
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        {t.saveEvent}
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
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
    color: COLORS.PRIMARY,
  },
  input: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: COLORS.PRIMARY,
  },
}); 