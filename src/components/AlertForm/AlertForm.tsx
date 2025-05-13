import {zodResolver} from '@hookform/resolvers/zod';
import {CreateAlertForm, createAlertSchema} from './AlertFormSchema';
import {useForm} from 'react-hook-form';
import {alertService} from '../../services/alert/alertService';
import {CreateAlertDto} from '../../services/alert/alertTypes';
import {Box} from '../Box/Box';
import {FormTextInput} from '../FormTextInput/FormTextInput';
import {FormBottomSheetSelect} from '../FormBottomSheetSelect/FormBottomSheetSelect';
import {Text} from '../Text/Text';
import {Button} from '../Button/Button';
import {IntervalForm} from '../IntervalForm/IntervalForm';

export function AlertForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm<CreateAlertForm>({
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
    },
  });

  const alertType = watch('alertType');

  const onSubmit = async (data: CreateAlertForm) => {
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
          label="Horário do alerta"
          name="interval"
        />
      )}

      {alertType === 'DAILY' && (
        //  <TimeInput control={control} />
        <Text>Time DAILY</Text>
      )}

      {alertType === 'WEEKLY' && (
        <>
          {/* <DaySelector control={control} name="week" /> */}
          <Text>week input</Text>
          {/* <TimeInput control={control} /> */}
          <Text>Time input</Text>
        </>
      )}

      {alertType === 'DATE' && (
        // <DatePicker control={control} name="date" />
        <Text>DatePicker pinput</Text>
      )}

      <Button
        title="Criar alerta"
        buttonVariant="fill"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
      />
    </Box>
  );
}
