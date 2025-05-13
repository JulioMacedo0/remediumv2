import React, {useMemo, useRef, useCallback} from 'react';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Controller, UseControllerProps, FieldValues} from 'react-hook-form';
import {Box, BoxProps, TouchableOpacityBox} from '../Box/Box';
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
  boxProps?: BoxProps;
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
  boxProps,
}: FormBottomSheetSelectProps<FormType, T>) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%'], []);
  const {colors} = useAppTheme();

  const openSheet = () => bottomSheetRef.current?.present();
  const closeSheet = () => bottomSheetRef.current?.dismiss();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <Box {...boxProps}>
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
              <Text color="grayWhite" preset="paragraphMedium">
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
              handleIndicatorStyle={{
                backgroundColor: colors.grayWhite,
              }}
              backdropComponent={renderBackdrop}
              backgroundStyle={{
                backgroundColor: colors.primary,
                opacity: 1,
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
    </Box>
  );
}
