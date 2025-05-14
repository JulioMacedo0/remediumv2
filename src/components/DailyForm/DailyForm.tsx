import React, {useState} from 'react';
import {Controller, Control} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {Box, BoxProps, TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

type DailyFormProps = {
  control: Control<any>;
  name?: string;
  label?: string;
  boxProps?: BoxProps;
};

export function DailyForm({
  control,
  name = 'date',
  label,
  boxProps,
}: DailyFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box {...boxProps}>
      {label && (
        <Text preset="paragraphMedium" mb="s4" color="primary">
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({field, fieldState}) => {
          const selectedDate = field.value ? new Date(field.value) : new Date();

          const timeOnly = new Date();
          if (field.value) {
            const dateValue = new Date(field.value);
            timeOnly.setHours(dateValue.getHours());
            timeOnly.setMinutes(dateValue.getMinutes());
          }

          return (
            <>
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
                    ? format(new Date(field.value), 'HH:mm', {locale: ptBR})
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
  );
}
