export type AlertType = 'INTERVAL' | 'DAILY' | 'WEEKLY' | 'DATE';
export type DayOfWeek =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';

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
