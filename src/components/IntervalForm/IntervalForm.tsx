import React, {useState} from 'react';
import {Controller, Control} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {Box, BoxProps, TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';
import {format} from 'date-fns';
import {CreateAlertForm} from '../AlertForm/AlertFormSchema';

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

type Interval = {
  hours: number;
  minutes: number;
  seconds: number;
};

type IntervalFormProps = {
  control: Control<CreateAlertForm>;
  label?: string;
  boxProps?: BoxProps;
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
                <Text color="grayWhite">
                  {field.value
                    ? format(intervalToDate(field.value), 'HH:mm')
                    : 'Selecionar horário'}
                </Text>
                {!!fieldState.error?.message && (
                  <Text color="error" mt="s4" preset="paragraphSmall">
                    {fieldState.error.message}
                  </Text>
                )}
              </TouchableOpacityBox>

              <DatePicker
                modal
                mode="time"
                open={open}
                date={selectedDate}
                onConfirm={date => {
                  setOpen(false);
                  field.onChange(dateToInterval(date));
                }}
                onCancel={() => setOpen(false)}
                locale="pt-BR"
                theme="dark"
              />
            </>
          );
        }}
      />
    </Box>
  );
}
