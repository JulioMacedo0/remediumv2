import {zodResolver} from '@hookform/resolvers/zod';
import {CreateAlertForm, createAlertSchema} from './AlertFormSchema';
import {useForm} from 'react-hook-form';
import {alertService} from '../../services/alert/alertService';
import {CreateAlertDto} from '../../services/alert/alertTypes';
import {Box} from '../Box/Box';
import {FormTextInput} from '../FormTextInput/FormTextInput';

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
    </Box>
  );
}
