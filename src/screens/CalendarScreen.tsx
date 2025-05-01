import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, Image, Animated, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { Card, Title, Searchbar, Surface, Chip, Button, Dialog, Portal } from 'react-native-paper';
import { CHURCH_EVENTS_2025, ChurchEvent, getServiceTypeLabel, ServiceType, getEventsForDate } from '../services/ChurchCalendarService';
import { COLORS, CARD_STYLES } from '../constants/theme';
import { format } from 'date-fns';
import { mk } from 'date-fns/locale';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SocialMediaService from '../services/SocialMediaService';
import { Linking } from 'react-native';

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

const getEventImage = (event: ChurchEvent) => {
  const date = event.date;

  // January images
  if (event.name === 'Св. Наум Охридски') {
    try {
      return require('../../assets/images/saints/05-Jan.jpg');
    } catch (error) {
      console.error('Error loading January 5th image:', error);
      return null;
    }
  }

  // Handle all dates with a switch statement
  const dateKey = `${date.getDate()}-${date.getMonth() + 1}`; // +1 to convert from 0-based month
  switch (dateKey) {
    // January
    case '5-1': // January 5
      try {
        return require('../../assets/images/saints/05-Jan.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '12-1': // January 12
      try {
        return require('../../assets/images/saints/12-Jan.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '19-1': // January 19
      try {
        return require('../../assets/images/saints/19-Jan.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '26-1': // January 26
      try {
        return require('../../assets/images/saints/26-Jan.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    
    // February
    case '2-2': // February 2
      try {
        return require('../../assets/images/saints/02-Feb.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '9-2': // February 9
      try {
        return require('../../assets/images/saints/09-Feb.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '15-2': // February 15
      try {
        return require('../../assets/images/saints/15-Feb.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '16-2': // February 16
      try {
        return require('../../assets/images/saints/16-Feb.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '22-2': // February 22
      try {
        return require('../../assets/images/saints/22-Feb.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '23-2': // February 23
      try {
        return require('../../assets/images/saints/23-Feb.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // March
    case '2-3': // March 2
      try {
        return require('../../assets/images/saints/02-March.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '9-3': // March 9
      try {
        return require('../../assets/images/saints/09-March.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '16-3': // March 16
      try {
        return require('../../assets/images/saints/16-March.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '23-3': // March 23
      try {
        return require('../../assets/images/saints/23-March.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // April
    case '6-4': // April 6
      try {
        return require('../../assets/images/saints/06-April.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '12-4': // April 12
      try {
        return require('../../assets/images/saints/12-April.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '13-4': // April 13
      try {
        return require('../../assets/images/saints/13-April.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '17-4': // April 17
      try {
        return require('../../assets/images/saints/17-April.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '18-4': // April 18
      try {
        return require('../../assets/images/saints/18-April.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '19-4': // April 19
      try {
        return require('../../assets/images/saints/19-April.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '20-4': // April 20
      try {
        return require('../../assets/images/saints/20-April.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '27-4': // April 27
      try {
        return require('../../assets/images/saints/27-April.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // May
    case '4-5': // May 4
      try {
        return require('../../assets/images/saints/04-May.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '6-5': // May 6
      try {
        return require('../../assets/images/saints/06-May.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '11-5': // May 11
      try {
        return require('../../assets/images/saints/11-May.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '18-5': // May 18
      try {
        return require('../../assets/images/saints/18-May.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '24-5': // May 24
      try {
        return require('../../assets/images/saints/24-May.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '25-5': // May 25
      try {
        return require('../../assets/images/saints/25-May.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '28-5': // May 28
      try {
        return require('../../assets/images/saints/28-May.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '29-5': // May 29 (using same image as May 28)
      try {
        return require('../../assets/images/saints/28-May.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // June
    case '1-6': // June 1
      try {
        return require('../../assets/images/saints/01-June.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '2-6': // June 2
      try {
        return require('../../assets/images/saints/01-June.jpg'); // Using June 1st image as fallback
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '8-6': // June 8
      try {
        return require('../../assets/images/saints/08-June.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '15-6': // June 15
      try {
        return require('../../assets/images/saints/15-June.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '22-6': // June 22
      try {
        return require('../../assets/images/saints/22-June.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '29-6': // June 29
      try {
        return require('../../assets/images/saints/29-June.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // July
    case '2-7': // July 2
      try {
        return require('../../assets/images/saints/07-July.jpg'); // Using July 7th image as fallback
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '3-7': // July 3
      try {
        return require('../../assets/images/saints/03-July.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '6-7': // July 6
      try {
        return require('../../assets/images/saints/03-July.jpg'); // Using July 3rd image as fallback
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '12-7': // July 12
      try {
        return require('../../assets/images/saints/12-July.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '13-7': // July 13
      try {
        return require('../../assets/images/saints/13-July.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '20-7': // July 20
      try {
        return require('../../assets/images/saints/20-July.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '27-7': // July 27
      try {
        return require('../../assets/images/saints/27-July.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // August
    case '3-8': // August 3
      try {
        return require('../../assets/images/saints/03-Aug.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '10-8': // August 10
      try {
        return require('../../assets/images/saints/10-Aug.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '17-8': // August 17
      try {
        return require('../../assets/images/saints/17-Aug.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '18-8': // August 18
      try {
        return require('../../assets/images/saints/18-Aug.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '24-8': // August 24
      try {
        return require('../../assets/images/saints/24-Aug.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '27-8': // August 27
      try {
        return require('../../assets/images/saints/27-Aug.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '28-8': // August 28
      try {
        return require('../../assets/images/saints/28-Aug.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '31-8': // August 31
      try {
        return require('../../assets/images/saints/31-Aug.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // September
    case '7-9': // September 7
      try {
        return require('../../assets/images/saints/07-Sep.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '10-9': // September 10
      try {
        return require('../../assets/images/saints/11-Sep.jpg'); // Using Sept 11 image as it's related to St. John
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '11-9': // September 11
      try {
        return require('../../assets/images/saints/11-Sep.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '14-9': // September 14
      try {
        return require('../../assets/images/saints/14-Sep.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '21-9': // September 21
      try {
        return require('../../assets/images/saints/21-Sep.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '27-9': // September 27
      try {
        return require('../../assets/images/saints/27-Sep.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '28-9': // September 28
      try {
        return require('../../assets/images/saints/28-Sep.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // October
    case '5-10': // October 5
      try {
        return require('../../assets/images/saints/05- Oct.jpg'); // Note the space after hyphen
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '12-10': // October 12
      try {
        return require('../../assets/images/saints/12-Oct.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '19-10': // October 19
      try {
        return require('../../assets/images/saints/19-Oct.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '26-10': // October 26
      try {
        return require('../../assets/images/saints/26-Oct.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '27-10': // October 27 - St. Petka (Petkovden)
      try {
        return require('../../assets/images/saints/27-Oct.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // November
    case '1-11': // November 1 - ZADUSHNICA
      try {
        return require('../../assets/images/saints/01-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '2-11': // November 2
      try {
        return require('../../assets/images/saints/02-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '8-11': // November 8 - St. Dimitrij (Mitrovden)
      try {
        return require('../../assets/images/saints/08-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '9-11': // November 9
      try {
        return require('../../assets/images/saints/09-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '16-11': // November 16
      try {
        return require('../../assets/images/saints/16-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '20-11': // November 20 - St. Archangel Michael (Evening)
      try {
        return require('../../assets/images/saints/20-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '21-11': // November 21 - St. Archangel Michael
      try {
        return require('../../assets/images/saints/21-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '23-11': // November 23
      try {
        return require('../../assets/images/saints/23-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '30-11': // November 30
      try {
        return require('../../assets/images/saints/30-Nov.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    // December
    case '3-12': // December 3 - Prechista (Evening)
      try {
        return require('../../assets/images/saints/03-Dec.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '4-12': // December 4 - Prechista
      try {
        return require('../../assets/images/saints/04-Dec.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '7-12': // December 7
      try {
        return require('../../assets/images/saints/07-Dec.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '14-12': // December 14
      try {
        return require('../../assets/images/saints/14-Dec.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '18-12': // December 18 - St. Nikolaj (Evening)
      try {
        return require('../../assets/images/saints/18-Dec.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '19-12': // December 19 - St. Nikolaj
      try {
        return require('../../assets/images/saints/19-Dec.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '21-12': // December 21
      try {
        return require('../../assets/images/saints/21-Dec.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }
    case '28-12': // December 28
      try {
        return require('../../assets/images/saints/28-Dec.jpg');
      } catch (error) {
        console.error('Error loading image:', error);
        return null;
      }

    default:
      // Special case for Christmas
      if (event.name.includes('БОЖИК') || event.name.includes('Рождество Христово')) {
        try {
          return require('../../assets/images/Bozik.jpg');
        } catch (error) {
          console.error('Error loading Bozik image:', error);
          return null;
        }
      }
      return null;
  }
};

const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={require('../../assets/images/Loading screen.jpg')}
        style={styles.loadingBackground}
        resizeMode="cover"
        onError={(error) => console.error('Error loading image:', error)}
      />
      <View style={[styles.dimOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]} />
      <View style={styles.loadingContent}>
        <View style={styles.churchInfoContainer}>
          <Text style={styles.churchName}>Македонска Православна Црковна Општина</Text>
          <Text style={styles.churchName}>Св. Наум Охридски, Швајцарија</Text>
          <Text style={styles.churchAddress}>CH – 6234 Триенген</Text>
        </View>
        <ActivityIndicator size="large" color={COLORS.TEXT_LIGHT} />
        <Text style={styles.loadingText}>Се вчитува...</Text>
      </View>
    </View>
  );
};

export const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<ChurchEvent[]>(CHURCH_EVENTS_2025);
  const [serviceTypeFilters, setServiceTypeFilters] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<Set<ServiceType>>(new Set());
  const [contactDialogVisible, setContactDialogVisible] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  const toggleServiceTypeFilter = (serviceType: ServiceType) => {
    const newSelectedTypes = new Set(selectedServiceTypes);
    if (newSelectedTypes.has(serviceType)) {
      newSelectedTypes.delete(serviceType);
    } else {
      newSelectedTypes.add(serviceType);
    }
    setSelectedServiceTypes(newSelectedTypes);
  };

  // Month names in Macedonian
  const monthNames = [
    'Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни',
    'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
  ];

  const renderServiceTypeFilters = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContentContainer}
    >
      {Object.entries(SERVICE_TYPE_COLORS).map(([type, color]) => (
        <Chip
          key={type}
          selected={selectedServiceTypes.has(type as ServiceType)}
          onPress={() => toggleServiceTypeFilter(type as ServiceType)}
          style={[
            styles.filterChip,
            { backgroundColor: selectedServiceTypes.has(type as ServiceType) ? color : COLORS.SURFACE }
          ]}
          textStyle={[
            styles.filterChipText,
            { color: selectedServiceTypes.has(type as ServiceType) ? COLORS.TEXT_LIGHT : COLORS.TEXT }
          ]}
          icon={() => (
            <MaterialCommunityIcons
              name={SERVICE_TYPE_ICONS[type as ServiceType]}
              size={16}
              color={selectedServiceTypes.has(type as ServiceType) ? COLORS.TEXT_LIGHT : COLORS.TEXT}
            />
          )}
        >
          {getServiceTypeLabel(type as ServiceType)}
        </Chip>
      ))}
    </ScrollView>
  );

  const showContactInfo = () => {
    setContactDialogVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <Image
          source={require('../../assets/images/background_app.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Searchbar
            placeholder="Пребарувај настани"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#4267B2' }]}
              onPress={() => SocialMediaService.openFacebookGroup()}
            >
              <MaterialCommunityIcons name="facebook" size={24} color={COLORS.TEXT_LIGHT} />
              <Text style={styles.buttonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: COLORS.PRIMARY }]}
              onPress={showContactInfo}
            >
              <MaterialCommunityIcons name="phone" size={24} color={COLORS.TEXT_LIGHT} />
              <Text style={styles.buttonText}>Контакт</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: COLORS.TERTIARY }]}
              onPress={() => SocialMediaService.openWebsite()}
            >
              <MaterialCommunityIcons name="web" size={24} color={COLORS.TEXT_LIGHT} />
              <Text style={styles.buttonText}>Веб-страна</Text>
            </TouchableOpacity>
          </View>
          
          {renderServiceTypeFilters()}
          
          {Object.entries(filteredAndGroupedEvents).map(([month, monthEvents]) => (
            <View key={month} style={styles.monthSection}>
              <Surface style={styles.monthHeader}>
                <Title style={styles.monthTitle}>{monthNames[parseInt(month)]}</Title>
              </Surface>
              <View style={styles.eventList}>
                {monthEvents
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event, index) => (
                    <Card 
                      key={`${month}-${index}`} 
                      style={[
                        styles.eventCard,
                        { borderLeftColor: SERVICE_TYPE_COLORS[event.serviceType] }
                      ]}
                    >
                      <Card.Content>
                        <View style={styles.cardContent}>
                          <Title style={styles.eventTitle}>{event.name}</Title>
                          <View style={styles.cardDetails}>
                            <View style={styles.dateContainer}>
                              <Text style={styles.dateDay}>
                                {format(event.date, 'dd', { locale: mk })}
                              </Text>
                              <Text style={styles.dateMonth}>
                                {format(event.date, 'MMM', { locale: mk })}
                              </Text>
                            </View>
                            <View style={styles.eventInfo}>
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
                                {event.description || `Време: ${event.time}ч`}
                              </Text>
                            </View>
                            <View style={styles.rightContainer}>
                              <View style={styles.imageContainer}>
                                {(() => {
                                  const eventImage = getEventImage(event);
                                  return eventImage ? (
                                    <Image 
                                      source={eventImage}
                                      style={styles.eventImage}
                                      resizeMode="cover"
                                    />
                                  ) : (
                                    <MaterialCommunityIcons 
                                      name={SERVICE_TYPE_ICONS[event.serviceType]}
                                      size={40}
                                      color={SERVICE_TYPE_COLORS[event.serviceType]}
                                      style={styles.fallbackIcon}
                                    />
                                  );
                                })()}
                              </View>
                            </View>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <Portal>
          <Dialog
            visible={contactDialogVisible}
            onDismiss={() => setContactDialogVisible(false)}
            style={styles.dialog}
          >
            <Dialog.Title style={{ color: COLORS.PRIMARY, fontSize: 20, fontWeight: 'bold' }}>
              Контакт Информации
            </Dialog.Title>
            <Dialog.Content>
              <Text style={{
                fontSize: 16,
                lineHeight: 24,
                marginBottom: 16,
                color: COLORS.TEXT,
              }}>
                Браќа и Сестри, со Благослов на Неговото високопреосвештенство Митрополит Европски Пимен, Празниците кои според календарот паѓаат во работни денови, светите Богослужби се отслужуваат пред денот на празникот со почеток во 19.00 ч, според годишниот план за Богослужби.
              </Text>
              <Text style={{
                fontSize: 16,
                lineHeight: 24,
                marginTop: 8,
                fontWeight: 'bold',
                color: COLORS.PRIMARY,
              }}>
                Свештеник: Протoпрезвитер о. Горан Мантароски: 078 646 83 07
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setContactDialogVisible(false)}>Затвори</Button>
              <Button onPress={() => Linking.openURL('tel:+38978646837')}>Повикај</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: COLORS.SURFACE,
  },
  monthSection: {
    marginBottom: 20,
  },
  monthHeader: {
    backgroundColor: COLORS.PRIMARY,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
    padding: 12,
  },
  eventList: {
    paddingHorizontal: 16,
  },
  eventCard: {
    marginBottom: 12,
    padding: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 12,
    backgroundColor: '#F8F4E9', // Warm parchment color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderLeftWidth: 4, // Thicker left border for service type
  },
  cardContent: {
    flex: 1,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  eventTitle: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_LIGHT,
  },
  dateMonth: {
    fontSize: 12,
    color: COLORS.TEXT_LIGHT,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: 2,
  },
  eventInfo: {
    flex: 1,
    paddingRight: 12,
  },
  serviceTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: COLORS.BACKGROUND,
    padding: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  serviceType: {
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '600',
    color: COLORS.TEXT,
  },
  time: {
    fontSize: 13,
    color: COLORS.TERTIARY,
    fontWeight: '600',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 4,
    marginVertical: -8,
    marginRight: -4,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginBottom: 0,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.BORDER,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  fallbackIcon: {
    opacity: 0.7,
    fontSize: 70,
    color: COLORS.PRIMARY,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  loadingBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  dimOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  loadingText: {
    color: COLORS.TEXT_LIGHT,
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  filterContentContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    elevation: 2,
    backgroundColor: COLORS.SURFACE,
    marginHorizontal: 4,
    marginVertical: 4,
    minWidth: Platform.OS === 'web' ? 120 : 100,
    maxWidth: Platform.OS === 'web' ? 200 : 150,
  },
  filterChipText: {
    fontSize: Platform.OS === 'web' ? 14 : 12,
    textAlign: 'center',
  },
  dialog: {
    backgroundColor: COLORS.SURFACE,
    margin: 20,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: COLORS.TEXT_LIGHT,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  churchInfoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  churchName: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  churchAddress: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 16,
    marginTop: 4,
  },
});
