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
    },
  });

  const alertType = watch('alertType');

  const onSubmit = async (data: CreateAlertForm) => {
    const payload: CreateAlertDto = {
      ...data,
      trigger: {
        alertType: data.alertType,
        hours: data.hours,
        minutes: data.minutes,
        seconds: data.seconds,
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
        placeholder="Ripirona"
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
        // <TimeInput control={control} />
        <Text>Time input</Text>
      )}

      {alertType === 'DAILY' && (
        //  <TimeInput control={control} />
        <Text>Time input</Text>
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
