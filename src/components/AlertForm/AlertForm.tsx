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
import {
  Alert,
  CreateAlertDto,
  UpdateAlertDto,
} from '../../services/alert/alertTypes';
import {alertService} from '../../services/alert/alertService';
import {
  showToastSuccess,
  showToastError,
} from '../../services/toast/toastService';
import {useEffect, useState} from 'react';
import {Text} from '../Text/Text';

type AlertFormProps = {
  mode?: 'create' | 'edit';
  initialAlert?: Alert;
  alertId?: string;
  onSuccess?: () => void;
};

export function AlertForm({
  mode = 'create',
  initialAlert,
  alertId,
  onSuccess,
}: AlertFormProps) {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isEditMode = mode === 'edit';

  const defaultValues = {
    title: '',
    subtitle: '',
    body: '',
    alertType: 'INTERVAL' as const,
    interval: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    date: undefined,
    week: [],
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: {isSubmitting},
  } = useForm({
    resolver: zodResolver(createAlertSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isEditMode && initialAlert && initialAlert.trigger) {
      setValue('title', initialAlert.title);
      setValue('subtitle', initialAlert.subtitle || '');
      setValue('body', initialAlert.body || '');
      setValue('alertType', initialAlert.trigger.alertType);

      setValue('interval', {
        hours: initialAlert.trigger.hours || 0,
        minutes: initialAlert.trigger.minutes || 0,
        seconds: initialAlert.trigger.seconds || 0,
      });

      if (initialAlert.trigger.date) {
        setValue('date', initialAlert.trigger.date);
      }

      if (initialAlert.trigger.week && initialAlert.trigger.week.length > 0) {
        setValue('week', initialAlert.trigger.week);
      }
    }
  }, [isEditMode, initialAlert, setValue]);

  const alertType = watch('alertType');

  const handleDelete = async () => {
    if (!alertId) {
      return;
    }

    setDeleteLoading(true);
    try {
      await alertService.remove(alertId);
      showToastSuccess('Alerta removido com sucesso!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erro ao remover alerta:', error);
      showToastError('Não foi possível remover o alerta. Tente novamente.');
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const onSubmit = async (data: CreateAlertForm) => {
    setLoading(true);
    try {
      const payload = {
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

      if (isEditMode && alertId) {
        await alertService.update(alertId, payload as UpdateAlertDto);
        showToastSuccess('Alerta atualizado com sucesso!');
      } else {
        await alertService.create(payload as CreateAlertDto);
        showToastSuccess('Alerta criado com sucesso!');
        reset(defaultValues);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(
        `Erro ao ${isEditMode ? 'atualizar' : 'criar'} alerta:`,
        error,
      );
      showToastError(
        `Não foi possível ${
          isEditMode ? 'atualizar' : 'criar'
        } o alerta. Tente novamente.`,
      );
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
        label="Instruções"
        placeholder="Tomar em jejum"
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

      <Box flexDirection="row" justifyContent="space-between" mt="s16">
        {isEditMode ? (
          <>
            <Box flex={1} mr="s8">
              <Button
                title="Excluir"
                buttonVariant="outline"
                onPress={() => setShowDeleteConfirm(true)}
                loading={deleteLoading}
                disabled={loading}
              />
            </Box>
            <Box flex={1} ml="s8">
              <Button
                title="Salvar"
                buttonVariant="fill"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                disabled={deleteLoading}
              />
            </Box>
          </>
        ) : (
          <Box width="100%">
            <Button
              title="Criar alerta"
              buttonVariant="fill"
              onPress={handleSubmit(onSubmit)}
              loading={loading || isSubmitting}
            />
          </Box>
        )}
      </Box>

      {showDeleteConfirm && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="background"
          justifyContent="center"
          alignItems="center"
          padding="s16">
          <Box
            backgroundColor="background"
            borderRadius="s16"
            padding="s16"
            width="100%">
            <Text
              preset="headingSmall"
              color="primary"
              textAlign="center"
              mb="s16">
              Excluir alerta
            </Text>
            <Text
              preset="paragraphMedium"
              color="primary"
              textAlign="center"
              mb="s24">
              Tem certeza que deseja excluir este alerta? Esta ação não pode ser
              desfeita.
            </Text>
            <Box flexDirection="row" justifyContent="space-between">
              <Box flex={1} mr="s8">
                <Button
                  title="Cancelar"
                  buttonVariant="outline"
                  onPress={() => setShowDeleteConfirm(false)}
                  disabled={deleteLoading}
                />
              </Box>
              <Box flex={1} ml="s8">
                <Button
                  title="Excluir"
                  buttonVariant="fill"
                  onPress={handleDelete}
                  loading={deleteLoading}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
