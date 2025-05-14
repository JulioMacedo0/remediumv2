import {zodResolver} from '@hookform/resolvers/zod';
import {CreateAlertForm, createAlertSchema} from './AlertFormSchema';
import {useForm} from 'react-hook-form';
import {Box} from '../Box/Box';
import {FormTextInput} from '../FormTextInput/FormTextInput';
import {FormBottomSheetSelect} from '../FormBottomSheetSelect/FormBottomSheetSelect';
import {Button} from '../Button/Button';
import {IntervalForm} from '../IntervalForm/IntervalForm';
import {DailyForm} from '../DailyForm/DailyForm';
import {WeeklyForm} from '../WeeklyForm/WeeklyForm';
import {DateForm} from '../DateForm/DateForm';
import {CreateAlertDto} from '../../services/alert/alertTypes';
import {alertService} from '../../services/alert/alertService';
import {
  showToastSuccess,
  showToastError,
} from '../../services/toast/toastService';
import {useState} from 'react';

export function AlertForm() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {isSubmitting},
  } = useForm({
    resolver: zodResolver(createAlertSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      body: '',
      alertType: 'INTERVAL',
      interval: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      date: undefined,
      week: [],
    },
  });

  const alertType = watch('alertType');

  const onSubmit = async (data: CreateAlertForm) => {
    setLoading(true);
    try {
      const payload: CreateAlertDto = {
        ...data,
        trigger: {
          alertType: data.alertType,
          hours: data.interval.hours,
          minutes: data.interval.minutes,
          seconds: data.interval.seconds,
          date: data.date,
          week: data.week ?? [],
        },
      };

      await alertService.create(payload);
      showToastSuccess('Alerta criado com sucesso!');

      reset({
        title: '',
        subtitle: '',
        body: '',
        alertType: 'INTERVAL',
        interval: {
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        date: undefined,
        week: [],
      });
    } catch (error) {
      console.error('Erro ao criar alerta:', error);
      showToastError('Não foi possível criar o alerta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <FormTextInput
        control={control}
        label="Nome do remédio"
        name="title"
        placeholder="Dipirona"
        boxProps={{
          mb: 's12',
        }}
      />
      <FormTextInput
        control={control}
        name="subtitle"
        label="Dosagem"
        placeholder="2 Comprimidos"
        boxProps={{
          mb: 's12',
        }}
      />
      <FormTextInput
        control={control}
        name="body"
        label="Lembrete"
        placeholder="Tomar antes da café da manhã"
        boxProps={{
          mb: 's12',
        }}
      />
      <FormBottomSheetSelect
        boxProps={{
          mb: 's12',
        }}
        control={control}
        name="alertType"
        label="Tipo de alerta"
        options={[
          {label: 'Intervalo', value: 'INTERVAL', iconProps: {name: 'Timer'}},
          {label: 'Diário', value: 'DAILY', iconProps: {name: 'Sun'}},
          {
            label: 'Semanal',
            value: 'WEEKLY',
            iconProps: {name: 'CalendarDays'},
          },
          {
            label: 'Data específica',
            value: 'DATE',
            iconProps: {name: 'CalendarCheck'},
          },
        ]}
      />

      {alertType === 'INTERVAL' && (
        <IntervalForm
          control={control}
          label="Intervalo de alerta"
          boxProps={{
            mb: 's12',
          }}
        />
      )}

      {alertType === 'DAILY' && (
        <DailyForm
          control={control}
          label="Horário do alerta diário"
          boxProps={{
            mb: 's12',
          }}
        />
      )}

      {alertType === 'WEEKLY' && (
        <WeeklyForm
          control={control}
          label="Configuração do alerta semanal"
          boxProps={{
            mb: 's12',
          }}
        />
      )}

      {alertType === 'DATE' && (
        <DateForm
          control={control}
          label="Data e hora do alerta"
          boxProps={{
            mb: 's12',
          }}
        />
      )}

      <Button
        title="Criar alerta"
        buttonVariant="fill"
        onPress={handleSubmit(onSubmit)}
        loading={loading || isSubmitting}
      />
    </Box>
  );
}
