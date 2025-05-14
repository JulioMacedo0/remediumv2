import React, {useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import {Box, BoxProps} from '../Box/Box';
import {Text} from '../Text/Text';
import {WeekDaySelector} from '../WeekDaySelector/WeekDaySelector';
import DatePicker from 'react-native-date-picker';
import {TouchableOpacityBox} from '../Box/Box';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

type WeeklyFormProps = {
  control: Control<any>;
  label?: string;
  boxProps?: BoxProps;
};

export function WeeklyForm({control, label, boxProps}: WeeklyFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box {...boxProps}>
      {label && (
        <Text preset="paragraphMedium" mb="s12" color="primary">
          {label}
        </Text>
      )}

      <WeekDaySelector
        control={control}
        label="Selecione os dias da semana"
        boxProps={{mb: 's16'}}
      />

      <Box mt="s12">
        <Controller
          control={control}
          name="date"
          render={({field, fieldState}) => {
            const selectedDate = field.value
              ? new Date(field.value)
              : new Date();

            return (
              <>
                <Text preset="paragraphMedium" mb="s8" color="primary">
                  Horário do alerta
                </Text>

                <TouchableOpacityBox
                  backgroundColor="primary"
                  borderRadius="s12"
                  px="s16"
                  py="s12"
                  activeOpacity={0.7}
                  onPress={() => setOpen(true)}>
                  <Text
                    color="grayWhite"
                    textAlign="center"
                    preset="paragraphMedium">
                    {field.value
                      ? format(selectedDate, 'HH:mm', {locale: ptBR})
                      : 'Selecionar horário'}
                  </Text>
                </TouchableOpacityBox>

                {!!fieldState.error?.message && (
                  <Text color="error" mt="s4" preset="paragraphSmall">
                    {fieldState.error.message}
                  </Text>
                )}

                <DatePicker
                  modal
                  mode="time"
                  is24hourSource="locale"
                  title={'Selecione o horário do alerta'}
                  confirmText="Confirmar"
                  cancelText="Cancelar"
                  open={open}
                  date={selectedDate}
                  onConfirm={date => {
                    setOpen(false);
                    field.onChange(date.toISOString());
                  }}
                  onCancel={() => setOpen(false)}
                  locale="pt-BR"
                  theme="light"
                />
              </>
            );
          }}
        />
      </Box>
    </Box>
  );
}
