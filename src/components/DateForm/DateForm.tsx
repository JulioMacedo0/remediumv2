import React, {useState} from 'react';
import {Controller, Control} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {Box, BoxProps, TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

type DateFormProps = {
  control: Control<any>;
  name?: string;
  label?: string;
  boxProps?: BoxProps;
};

export function DateForm({
  control,
  name = 'date',
  label,
  boxProps,
}: DateFormProps) {
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
                    ? format(selectedDate, "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })
                    : 'Selecionar data e hora'}
                </Text>
              </TouchableOpacityBox>

              {!!fieldState.error?.message && (
                <Text color="error" mt="s4" preset="paragraphSmall">
                  {fieldState.error.message}
                </Text>
              )}

              <DatePicker
                modal
                mode="datetime"
                is24hourSource="locale"
                title={'Selecione a data e hora do alerta'}
                confirmText="Confirmar"
                cancelText="Cancelar"
                open={open}
                date={selectedDate}
                minimumDate={new Date()}
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
