import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Platform, Image } from 'react-native';
import { Card, Title, Paragraph, Text, IconButton, Searchbar, Surface, Chip } from 'react-native-paper';
import { CHURCH_EVENTS_2025, ChurchEvent, getServiceTypeLabel, ServiceType } from '../services/ChurchCalendarService';
import { COLORS } from '../constants/theme';
import { format } from 'date-fns';
import { mk } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SERVICE_TYPE_COLORS = {
  LITURGY: '#E57373',
  EVENING_SERVICE: '#81C784',
  CHURCH_OPEN: '#64B5F6',
  PICNIC: '#FFB74D'
} as const;

const SERVICE_TYPE_ICONS = {
  LITURGY: 'church' as const,
  EVENING_SERVICE: 'moon-waning-crescent' as const,
  CHURCH_OPEN: 'door-open' as const,
  PICNIC: 'food' as const
} as const;

export const CalendarScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [attendedEvents, setAttendedEvents] = useState<Set<string>>(new Set());
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<Set<ServiceType>>(new Set());

  // Load attended events from storage on component mount
  React.useEffect(() => {
    loadAttendedEvents();
  }, []);

  const loadAttendedEvents = async () => {
    try {
      const attended = await AsyncStorage.getItem('attendedEvents');
      if (attended) {
        setAttendedEvents(new Set(JSON.parse(attended)));
      }
    } catch (error) {
      console.error('Error loading attended events:', error);
    }
  };

  const toggleEventAttendance = async (eventId: string) => {
    const newAttendedEvents = new Set(attendedEvents);
    if (newAttendedEvents.has(eventId)) {
      newAttendedEvents.delete(eventId);
    } else {
      newAttendedEvents.add(eventId);
    }
    setAttendedEvents(newAttendedEvents);
    
    try {
      await AsyncStorage.setItem('attendedEvents', JSON.stringify([...newAttendedEvents]));
    } catch (error) {
      console.error('Error saving attended events:', error);
    }
  };

  const toggleServiceTypeFilter = (serviceType: ServiceType) => {
    const newSelectedTypes = new Set(selectedServiceTypes);
    if (newSelectedTypes.has(serviceType)) {
      newSelectedTypes.delete(serviceType);
    } else {
      newSelectedTypes.add(serviceType);
    }
    setSelectedServiceTypes(newSelectedTypes);
  };

  // Group and filter events
  const filteredAndGroupedEvents = React.useMemo(() => {
    return CHURCH_EVENTS_2025
      .filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedServiceTypes.size === 0 || selectedServiceTypes.has(event.serviceType);
        return matchesSearch && matchesType;
      })
      .reduce((acc, event) => {
        const month = event.date.getMonth();
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(event);
        return acc;
      }, {} as Record<number, ChurchEvent[]>);
  }, [searchQuery, selectedServiceTypes]);

  // Month names in Macedonian
  const monthNames = [
    'Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни',
    'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
  ];

  const formatDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy', { locale: mk });
  };

  const renderServiceTypeFilters = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {Object.entries(SERVICE_TYPE_ICONS).map(([type, icon]) => (
        <Chip
          key={type}
          selected={selectedServiceTypes.has(type as ServiceType)}
          onPress={() => toggleServiceTypeFilter(type as ServiceType)}
          style={[
            styles.filterChip,
            { backgroundColor: selectedServiceTypes.has(type as ServiceType) 
              ? SERVICE_TYPE_COLORS[type as keyof typeof SERVICE_TYPE_COLORS] 
              : COLORS.SURFACE }
          ]}
          icon={() => (
            <MaterialCommunityIcons 
              name={icon} 
              size={20} 
              color={selectedServiceTypes.has(type as ServiceType) ? 'white' : COLORS.TEXT} 
            />
          )}
        >
          {getServiceTypeLabel(type as ServiceType)}
        </Chip>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../../assets/images/mpc-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerTextContainer}>
              <Title style={styles.churchName}>
                Македонска Православна Црковна Општина{'\n'}
                Св. Наум Охридски, Швајцарија
              </Title>
              <Text style={styles.churchAddress}>CH – 6234 Триенген</Text>
              <Text style={styles.calendarTitle}>
                Годишен план за Литургии и отворање на црквата за 2025 година
              </Text>
            </View>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../../assets/images/st-naum-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <Searchbar
          placeholder="Пребарувај настани"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        {renderServiceTypeFilters()}
      </Surface>

      <ScrollView style={styles.content}>
        {Object.entries(filteredAndGroupedEvents).map(([month, events]) => (
          <View key={month} style={styles.monthSection}>
            <Surface style={styles.monthHeader}>
              <Title style={styles.monthTitle}>{monthNames[parseInt(month)]}</Title>
            </Surface>
            <View style={styles.eventList}>
              {events
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((event, index) => {
                  const eventId = `${event.date.toISOString()}-${event.serviceType}`;
                  const isAttended = attendedEvents.has(eventId);
                  
                  return (
                    <Card 
                      key={`${month}-${index}`} 
                      style={[
                        styles.eventCard,
                        { borderLeftColor: SERVICE_TYPE_COLORS[event.serviceType] }
                      ]}
                    >
                      <Card.Content>
                        <View style={styles.cardHeader}>
                          <View style={styles.dateContainer}>
                            <Text style={styles.dateDay}>
                              {format(event.date, 'dd', { locale: mk })}
                            </Text>
                            <Text style={styles.dateMonth}>
                              {format(event.date, 'MMM', { locale: mk })}
                            </Text>
                          </View>
                          <View style={styles.eventInfo}>
                            <Title style={styles.eventTitle}>{event.name}</Title>
                            <View style={styles.serviceTypeContainer}>
                              <MaterialCommunityIcons 
                                name={SERVICE_TYPE_ICONS[event.serviceType]} 
                                size={16} 
                                color={SERVICE_TYPE_COLORS[event.serviceType]} 
                              />
                              <Text style={[
                                styles.serviceType,
                                { color: SERVICE_TYPE_COLORS[event.serviceType] }
                              ]}>
                                {getServiceTypeLabel(event.serviceType)}
                              </Text>
                            </View>
                            <Text style={styles.time}>
                              {event.description || `Време: ${event.time}`}
                            </Text>
                          </View>
                          <IconButton
                            icon={isAttended ? 'check-circle' : 'check-circle-outline'}
                            iconColor={isAttended ? COLORS.SUCCESS : COLORS.TEXT}
                            size={24}
                            onPress={() => toggleEventAttendance(eventId)}
                            style={styles.attendButton}
                          />
                        </View>
                      </Card.Content>
                    </Card>
                  );
                })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    elevation: 4,
    backgroundColor: COLORS.SURFACE,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  headerContent: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  logoWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  churchName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.PRIMARY,
    marginBottom: 4,
  },
  churchAddress: {
    fontSize: 16,
    color: COLORS.TEXT,
    marginBottom: 8,
  },
  calendarTitle: {
    fontSize: 16,
    color: COLORS.TEXT,
    textAlign: 'center',
    fontWeight: '500',
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
  monthSection: {
    marginBottom: 16,
  },
  monthHeader: {
    elevation: 2,
    backgroundColor: COLORS.SURFACE,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    paddingVertical: 12,
    color: COLORS.PRIMARY,
  },
  eventList: {
    padding: 16,
    paddingTop: 8,
  },
  eventCard: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 48,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
  dateMonth: {
    fontSize: 14,
    color: COLORS.TEXT,
    textTransform: 'uppercase',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  serviceTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    marginLeft: 4,
  },
  time: {
    fontSize: 14,
    color: COLORS.TEXT,
  },
  attendButton: {
    margin: 0,
  },
}); 