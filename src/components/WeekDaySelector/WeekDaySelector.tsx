import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {Box, BoxProps, TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';
import {ScrollView} from 'react-native';
import {CreateAlertForm} from '../AlertForm/AlertFormSchema';

export type DayOfWeek =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';

type WeekDaySelectorProps = {
  control: Control<any>;
  label?: string;
  boxProps?: BoxProps;
};

const DAYS_OF_WEEK: Array<{label: string; value: DayOfWeek}> = [
  {label: 'Dom', value: 'SUNDAY'},
  {label: 'Seg', value: 'MONDAY'},
  {label: 'Ter', value: 'TUESDAY'},
  {label: 'Qua', value: 'WEDNESDAY'},
  {label: 'Qui', value: 'THURSDAY'},
  {label: 'Sex', value: 'FRIDAY'},
  {label: 'Sáb', value: 'SATURDAY'},
];

export function WeekDaySelector({
  control,
  label,
  boxProps,
}: WeekDaySelectorProps) {
  return (
    <Box {...boxProps}>
      {label && (
        <Text preset="paragraphMedium" mb="s8" color="primary">
          {label}
        </Text>
      )}

      <Controller
        control={control as Control<CreateAlertForm>}
        name={'week'}
        render={({field, fieldState}) => {
          const selectedDays = field.value || [];

          const toggleDay = (day: DayOfWeek) => {
            const isSelected = selectedDays.includes(day);

            if (isSelected) {
              field.onChange(selectedDays.filter(d => d !== day));
            } else {
              field.onChange([...selectedDays, day]);
            }
          };

          return (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Box flexDirection="row" justifyContent="space-between" mb="s8">
                  {DAYS_OF_WEEK.map(day => {
                    const isSelected = selectedDays.includes(day.value);
                    return (
                      <TouchableOpacityBox
                        key={day.value}
                        backgroundColor={isSelected ? 'primary' : 'gray5'}
                        borderRadius="s8"
                        padding="s12"
                        mr="s8"
                        activeOpacity={0.7}
                        onPress={() => toggleDay(day.value)}>
                        <Text
                          preset="paragraphMedium"
                          color={isSelected ? 'grayWhite' : 'primary'}>
                          {day.label}
                        </Text>
                      </TouchableOpacityBox>
                    );
                  })}
                </Box>
              </ScrollView>
              {selectedDays.length === 0 && (
                <Text color="error" mt="s4" preset="paragraphSmall">
                  Selecione pelo menos um dia da semana
                </Text>
              )}
              {!!fieldState.error?.message && (
                <Text color="error" mt="s4" preset="paragraphSmall">
                  {fieldState.error.message}
                </Text>
              )}
            </>
          );
        }}
      />
    </Box>
  );
}
