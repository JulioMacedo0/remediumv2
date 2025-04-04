import React, {useRef, useState} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';

import {Box, BoxProps} from '../Box/Box';
import {$fontFamily, $fontSizes, Text} from '../Text/Text';
import {useAppTheme} from '../../hooks/UseAppTheme/UseAppTheme';

export type TextInputProps = {
  label?: string;
  errorMessage?: string;
  boxProps?: BoxProps;
} & RNTextInputProps;

export function TextInput({
  label,
  errorMessage,
  boxProps,
  ...props
}: TextInputProps) {
  const [onFocus, setOnFocus] = useState(false);
  const {colors} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  const $textInputContainer: BoxProps = {
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? 'error' : onFocus ? 'primary' : 'gray4',
    borderRadius: 's12',
    padding: 's8',
  };
  return (
    <Box {...boxProps}>
      <Pressable onPress={focusInput}>
        <Text preset="paragraphMedium" mb="s4" color="primary">
          {label}
        </Text>
        <Box {...$textInputContainer}>
          <RNTextInput
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            ref={inputRef}
            placeholderTextColor={onFocus ? colors.primary : colors.gray2}
            style={$textInputStyle}
            {...props}
          />
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
