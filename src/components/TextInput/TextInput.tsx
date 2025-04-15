import React, {useRef, useState} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';

import {Box, BoxProps, TouchableOpacityBox} from '../Box/Box';
import {$fontFamily, $fontSizes, Text} from '../Text/Text';
import {useAppTheme} from '../../hooks/UseAppTheme/UseAppTheme';
import {Icon} from '../Icon/Icon';

export type TextInputProps = {
  label?: string;
  errorMessage?: string;
  isPassword?: boolean;
  boxProps?: BoxProps;
} & RNTextInputProps;

export function TextInput({
  label,
  errorMessage,
  isPassword = false,
  boxProps,
  ...props
}: TextInputProps) {
  const [onFocus, setOnFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {colors} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  const $textInputContainer: BoxProps = {
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? 'error' : onFocus ? 'primary' : 'gray4',
    borderRadius: 's12',
    padding: 's8',
    flexDirection: 'row',
    alignItems: 'center',
  };

  return (
    <Box {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text preset="paragraphMedium" mb="s4" color="primary">
            {label}
          </Text>
        )}

        <Box {...$textInputContainer}>
          <RNTextInput
            ref={inputRef}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            placeholderTextColor={onFocus ? colors.primary : colors.gray2}
            secureTextEntry={isPassword && !isPasswordVisible}
            style={[$textInputStyle]}
            {...props}
          />

          {isPassword && (
            <TouchableOpacityBox
              onPress={togglePasswordVisibility}
              ml="s8"
              hitSlop={10}>
              <Icon
                name={isPasswordVisible ? 'Eye' : 'EyeOff'}
                size={22}
                color="gray2"
              />
            </TouchableOpacityBox>
          )}
        </Box>

        {errorMessage ? (
          <Text preset="paragraphSmall" bold color="error" mt="s10">
            {errorMessage}
          </Text>
        ) : null}
      </Pressable>
    </Box>
  );
}

const $textInputStyle: TextStyle = {
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
};
