import React, {useMemo, useRef} from 'react';
import {BottomSheetModal, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Controller, UseControllerProps, FieldValues} from 'react-hook-form';
import {TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';

import {useAppTheme} from '../../hooks/UseAppTheme/UseAppTheme';
import {Icon, IconProps} from '../Icon/Icon';

type Option<T> = {
  label: string;
  value: T;
  iconProps: IconProps;
};

type FormBottomSheetSelectProps<
  FormType extends FieldValues,
  T extends string,
> = {
  options: Option<T>[];
  placeholder?: string;
  label?: string;
} & UseControllerProps<FormType>;

export function FormBottomSheetSelect<
  FormType extends FieldValues,
  T extends string,
>({
  control,
  name,
  rules,
  options,
  placeholder = 'Selecionar',
  label,
}: FormBottomSheetSelectProps<FormType, T>) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%'], []);

  const openSheet = () => bottomSheetRef.current?.present();
  const closeSheet = () => bottomSheetRef.current?.dismiss();
  const {colors} = useAppTheme();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => (
        <>
          {label && (
            <Text preset="paragraphMedium" mb="s4" color="primary">
              {label}
            </Text>
          )}

          <TouchableOpacityBox
            onPress={openSheet}
            backgroundColor="primary"
            borderRadius="s12"
            px="s16"
            py="s12"
            activeOpacity={0.7}>
            <Text color={'grayWhite'} preset="paragraphMedium">
              {options.find(opt => opt.value === field.value)?.label ||
                placeholder}
            </Text>
            {!!fieldState.error?.message && (
              <Text color="error" mt="s4" preset="paragraphSmall">
                {fieldState.error.message}
              </Text>
            )}
          </TouchableOpacityBox>

          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backgroundStyle={{
              backgroundColor: colors.primary,
            }}>
            <BottomSheetFlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacityBox
                  px="s16"
                  py="s12"
                  flexDirection="row"
                  activeOpacity={0.7}
                  onPress={() => {
                    field.onChange(item.value);
                    closeSheet();
                  }}>
                  <Icon {...item.iconProps} size={18} color="grayWhite" />
                  <Text color="grayWhite" preset="paragraphMedium" ml="s12">
                    {item.label}
                  </Text>
                </TouchableOpacityBox>
              )}
            />
          </BottomSheetModal>
        </>
      )}
    />
  );
}
