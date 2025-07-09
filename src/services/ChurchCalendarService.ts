import { format, parse, isEqual } from 'date-fns';
import { mk } from 'date-fns/locale';

export type ServiceType = 
  | 'LITURGY' 
  | 'EVENING_SERVICE' 
  | 'CHURCH_OPEN' 
  | 'PICNIC';

export interface ChurchEvent {
  date: Date;
  name: string;
  serviceType: ServiceType;
  time: string;
  description?: string;
}

export const CHURCH_EVENTS_2025: ChurchEvent[] = [
  // January
  {
    date: new Date(2025, 1-1, 5),
    name: 'Св. Наум Охридски',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 1-1, 7),
    name: 'Рождество Христово БОЖИК',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 1-1, 7),
    name: 'Рождество Христово БОЖИК',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 1-1, 12),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 1-1, 19),
    name: 'Голем Богојавленски Водосвет, Богојавление',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 1-1, 26),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  // February
  {
    date: new Date(2025, 2-1, 2),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 2-1, 9),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 2-1, 15),
    name: 'Сретение Господово',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 2-1, 16),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 2-1, 22),
    name: 'ЗАДУШНИЦА',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 2-1, 23),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  // March
  {
    date: new Date(2025, 3-1, 2),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 3-1, 9),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 3-1, 16),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 3-1, 23),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  // April
  {
    date: new Date(2025, 4-1, 6),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 4-1, 12),
    name: 'Лазарева Сабота',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 4-1, 13),
    name: 'ЦВЕТНИЦИ',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 4-1, 17),
    name: 'Велики Четврток',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 4-1, 18),
    name: 'Велики Петок',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 4-1, 19),
    name: 'Велика Сабота',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 4-1, 20),
    name: 'Воскресение на Господ Исус Христос, Велигден',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 4-1, 27),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  // May
  {
    date: new Date(2025, 5-1, 4),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 5-1, 6),
    name: 'Св. вмч. Георгиј Победоносец',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 5-1, 11),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 5-1, 18),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 5-1, 24),
    name: 'Св. Кирил и Методиј',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 5-1, 25),
    name: 'Неделна',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 5-1, 28),
    name: 'Вознесение Господово, Спасовден',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 5-1, 29),
    name: 'Спасовден',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  // June events
  {
    date: new Date(2025, 5, 1), // June 1
    name: 'Неделна Литургија',
    time: '09:00',
    serviceType: 'LITURGY',
  },
  {
    date: new Date(2025, 5, 7), // June 7
    name: 'ЗАДУШНИЦА – Литургија',
    time: '09:00',
    serviceType: 'LITURGY',
  },
  {
    date: new Date(2025, 5, 8), // June 8
    name: 'Слегување на Св. Дух – Неделна Литургија',
    time: '09:00',
    serviceType: 'LITURGY',
  },
  {
    date: new Date(2025, 5, 15), // June 15
    name: 'Неделна Литургија',
    time: '09:00',
    serviceType: 'LITURGY',
  },
  {
    date: new Date(2025, 5, 22), // June 22
    name: 'Неделна Литургија',
    time: '09:00',
    serviceType: 'LITURGY',
  },
  {
    date: new Date(2025, 5, 29), // June 29
    name: 'Црквата е отворена / без свештеник',
    time: '09:00 – 13:00',
    serviceType: 'CHURCH_OPEN',
  },
  // July
  {
    date: new Date(2025, 7-1, 2),
    name: 'Св. Наум Охридски',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 7-1, 3),
    name: 'Св. Наум Охридски',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 7-1, 6),
    name: 'Неделна Литургија – Пикник',
    serviceType: 'PICNIC',
    time: '09:00'
  },
  {
    date: new Date(2025, 7-1, 12),
    name: 'Св. ап-ли Петар и Павле, Петровден',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 7-1, 13),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 7-1, 20),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 7-1, 27),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  // August
  {
    date: new Date(2025, 8-1, 3),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 8-1, 10),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 8-1, 17),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 8-1, 18),
    name: 'Преображение на Господ Исус Христос',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 8-1, 24),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 8-1, 27),
    name: 'Успение на Пресвета Богородица',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 8-1, 28),
    name: 'Богородица',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 8-1, 31),
    name: 'Неделна Литургија ��� Пикник',
    serviceType: 'PICNIC',
    time: '09:00'
  },
  // September
  {
    date: new Date(2025, 9-1, 7),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 9-1, 10),
    name: 'Отсекување на главата на Св. Јован Крстител',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 9-1, 11),
    name: 'Св. Јован Крстител',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 9-1, 14),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 9-1, 21),
    name: 'Мала Богородица – Литургија – Пикник',
    serviceType: 'PICNIC',
    time: '09:00'
  },
  {
    date: new Date(2025, 9-1, 27),
    name: 'Воздвижение на Чесниот Крст, Крстовден',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 9-1, 28),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  // October
  {
    date: new Date(2025, 10-1, 5),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 10-1, 12),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 10-1, 19),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 10-1, 26),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 10-1, 27),
    name: 'Св. Петка, Петковден',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  // November
  {
    date: new Date(2025, 11-1, 1),
    name: 'ЗАДУШНИЦА',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 11-1, 2),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 11-1, 8),
    name: 'Св. вмч. Димитриј – Митровден',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 11-1, 9),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 11-1, 16),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 11-1, 20),
    name: 'Собор на св. Архангел Михаил',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 11-1, 21),
    name: 'Собор на св. Архангел Михаил',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 11-1, 23),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 11-1, 30),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  // December
  {
    date: new Date(2025, 12-1, 3),
    name: 'Воведение на Пресвета Богородица – Пречиста',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 12-1, 4),
    name: 'Пречиста',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 12-1, 7),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 12-1, 14),
    name: 'Неделна Литургија',
    serviceType: 'LITURGY',
    time: '09:00'
  },
  {
    date: new Date(2025, 12-1, 18),
    name: 'Св. Николај',
    serviceType: 'EVENING_SERVICE',
    time: '19:00'
  },
  {
    date: new Date(2025, 12-1, 19),
    name: 'Св. Николај',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 12-1, 21),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  },
  {
    date: new Date(2025, 12-1, 28),
    name: 'Црквата е отворена / без свештеник',
    serviceType: 'CHURCH_OPEN',
    time: '09:00',
    description: '09:00 - 13:00'
  }
];

export const getEventsForDate = (date: Date): ChurchEvent[] => {
  return CHURCH_EVENTS_2025.filter(event => 
    isEqual(
      new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()),
      new Date(date.getFullYear(), date.getMonth(), date.getDate())
    )
  );
};

export const getUpcomingEvents = (fromDate: Date, days: number = 7): ChurchEvent[] => {
  const endDate = new Date(fromDate);
  endDate.setDate(endDate.getDate() + days);
  
  return CHURCH_EVENTS_2025.filter(event => 
    event.date >= fromDate && event.date <= endDate
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const formatEventDate = (date: Date): string => {
  return format(date, 'dd.MM.yyyy');
};

export const formatEventTime = (time: string): string => {
  return time;
};

export const getServiceTypeLabel = (type: ServiceType): string => {
  switch (type) {
    case 'LITURGY':
      return 'Литургија';
    case 'EVENING_SERVICE':
      return 'Вечерна Богослужба';
    case 'CHURCH_OPEN':
      return 'Црквата е отворена / без свештеник';
    case 'PICNIC':
      return 'Пикник';
    default:
      return '';
  }
}; 