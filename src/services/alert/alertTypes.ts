export const ALERT_TYPES = ['INTERVAL', 'DAILY', 'WEEKLY', 'DATE'] as const;

export type AlertType = (typeof ALERT_TYPES)[number];

export const DAYS_OF_WEEK = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

export type Trigger = {
  id: string;
  alertType: AlertType;
  date?: string;
  last_alert?: string;
  hours?: number;
  minutes?: number;
  seconds?: number;
  week: DayOfWeek[];
};

export type Alert = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  trigger?: Trigger;
};

export type CreateAlertDto = {
  title: string;
  subtitle: string;
  body: string;
  trigger: Omit<Trigger, 'id' | 'alertId' | 'last_alert'>;
};

export type UpdateAlertDto = Partial<CreateAlertDto>;
