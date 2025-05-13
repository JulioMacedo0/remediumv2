import React, {useState} from 'react';
import {Controller, UseControllerProps, FieldValues} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';
import {format} from 'date-fns';

type FormTimePickerProps<FormType extends FieldValues> = {
  label?: string;
} & UseControllerProps<FormType>;

export function FormTimePicker<FormType extends FieldValues>({
  control,
  name,
  rules,
  label,
}: FormTimePickerProps<FormType>) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => {
        const selectedDate = field.value ? new Date(field.value) : new Date();

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
                  ? format(new Date(field.value), 'HH:mm')
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
                field.onChange(date.toISOString());
                console.log(date.toISOString());
                // ou apenas `date` se preferir
              }}
              onCancel={() => setOpen(false)}
              locale="pt-BR"
              theme="dark" // ou 'light' dependendo do seu tema
            />
          </>
        );
      }}
    />
  );
}
