import React, {useState} from 'react';
import {Controller, Control} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {Box, BoxProps, TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';

export type Interval = {
  hours: number;
  minutes: number;
  seconds: number;
};

type IntervalFormProps = {
  control: Control<any>;
  label?: string;
  boxProps?: BoxProps;
};

const intervalToDate = (interval: Interval): Date => {
  const now = new Date();
  now.setHours(interval.hours || 0);
  now.setMinutes(interval.minutes || 0);
  now.setSeconds(interval.seconds || 0);
  return now;
};

const dateToInterval = (date: Date): Interval => {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

export function IntervalForm({control, label, boxProps}: IntervalFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box {...boxProps}>
      <Controller
        control={control}
        name={'interval'}
        render={({field, fieldState}) => {
          const selectedDate = field.value
            ? intervalToDate(field.value)
            : new Date();
          return (
            <>
              {label && (
                <Text preset="paragraphMedium" mb="s4" color="primary">
                  {label}
                </Text>
              )}

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
                    ? (() => {
                        const {hours, minutes} = field.value;

                        if (hours === 0 && minutes === 0) {
                          return 'Selecionar horário';
                        }

                        const parts = [];

                        if (hours) {
                          parts.push(
                            `${hours} ${hours === 1 ? 'hora' : 'horas'}`,
                          );
                        }

                        if (minutes) {
                          parts.push(
                            `${minutes} ${
                              minutes === 1 ? 'minuto' : 'minutos'
                            }`,
                          );
                        }

                        return parts.length > 0
                          ? `A cada ${parts.join(' e ')}`
                          : 'Selecionar horário';
                      })()
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
                title={'Selecione o intervalo do alerta'}
                confirmText="Confirmar"
                cancelText="Cancelar"
                open={open}
                date={selectedDate}
                onConfirm={date => {
                  setOpen(false);
                  field.onChange(dateToInterval(date));
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
  );
}
