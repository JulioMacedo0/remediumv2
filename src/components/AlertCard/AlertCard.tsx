import React from 'react';
import {format, formatDistance} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {Alert, AlertType, DayOfWeek} from '../../services/alert/alertTypes';
import {Box, TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';
import {Icon} from '../Icon/Icon';

type AlertCardProps = {
  alert: Alert;
  onPress?: () => void;
};

const dayOfWeekNames: Record<DayOfWeek, string> = {
  SUNDAY: 'Domingo',
  MONDAY: 'Segunda',
  TUESDAY: 'Terça',
  WEDNESDAY: 'Quarta',
  THURSDAY: 'Quinta',
  FRIDAY: 'Sexta',
  SATURDAY: 'Sábado',
};

const formatTime = (hours?: number, minutes?: number): string => {
  if (hours === undefined || minutes === undefined) {
    return '--:--';
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`;
};

const getAlertTypeIcon = (alertType: AlertType) => {
  switch (alertType) {
    case 'INTERVAL':
      return 'Timer';
    case 'DAILY':
      return 'Sun';
    case 'WEEKLY':
      return 'CalendarDays';
    case 'DATE':
      return 'CalendarCheck';
    default:
      return 'Bell';
  }
};

const renderTriggerSummary = (alert: Alert) => {
  if (!alert.trigger) {
    return 'Sem programação definida';
  }

  const {alertType, hours, minutes, date, week, last_alert} = alert.trigger;

  switch (alertType) {
    case 'INTERVAL': {
      const intervalText = [];
      if (hours && hours > 0) {
        intervalText.push(`${hours} ${hours === 1 ? 'hora' : 'horas'}`);
      }
      if (minutes && minutes > 0) {
        intervalText.push(`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`);
      }

      let nextAlertText = 'Próximo alerta não definido';
      if (last_alert) {
        const lastAlertDate = new Date(last_alert);
        const nextDate = new Date(lastAlertDate);

        if (hours) {
          nextDate.setHours(nextDate.getHours() + hours);
        }
        if (minutes) {
          nextDate.setMinutes(nextDate.getMinutes() + minutes);
        }

        nextAlertText = `Próximo alerta ${formatDistance(nextDate, new Date(), {
          addSuffix: true,
          locale: ptBR,
        })}`;
      }

      return intervalText.length > 0
        ? `A cada ${intervalText.join(' e ')}. ${nextAlertText}`
        : nextAlertText;
    }

    case 'DAILY':
      return `Todos os dias às ${formatTime(hours, minutes)}`;

    case 'WEEKLY': {
      const daysText =
        week?.map(day => dayOfWeekNames[day]).join(', ') ||
        'Nenhum dia selecionado';
      return `${daysText} às ${formatTime(hours, minutes)}`;
    }

    case 'DATE':
      if (!date) {
        return 'Data não definida';
      }
      return `Em ${format(new Date(date), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      })}`;

    default:
      return 'Programação desconhecida';
  }
};

export function AlertCard({alert, onPress}: AlertCardProps) {
  const iconName = getAlertTypeIcon(alert.trigger?.alertType || 'INTERVAL');

  return (
    <TouchableOpacityBox
      backgroundColor="background"
      padding="s16"
      borderRadius="s12"
      marginVertical="s8"
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      borderWidth={1}
      borderColor="primary">
      <Box flexDirection="row" alignItems="center" mb="s8">
        <Box backgroundColor="primary" padding="s8" borderRadius="s8" mr="s12">
          <Icon name={iconName} color="grayWhite" size={22} />
        </Box>
        <Box flex={1}>
          <Text preset="headingSmall" color="primary" numberOfLines={1}>
            {alert.title}
          </Text>
          <Text preset="paragraphMedium" color="primary" numberOfLines={1}>
            {alert.subtitle}
          </Text>
        </Box>
      </Box>

      <Box paddingHorizontal="s4">
        <Text preset="paragraphSmall" color="primary" mb="s8">
          {alert.body}
        </Text>

        <Box backgroundColor="gray5" padding="s12" borderRadius="s8" mt="s4">
          <Text preset="paragraphSmall" color="primary">
            {renderTriggerSummary(alert)}
          </Text>
        </Box>
      </Box>
    </TouchableOpacityBox>
  );
}
