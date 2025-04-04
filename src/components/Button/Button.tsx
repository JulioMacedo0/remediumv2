import React from 'react';

import {TouchableOpacityBox, TouchableOpacityBoxProps} from '../Box/Box';
import {Text} from '../Text/Text';
import {ThemeColors} from '../../theme/theme';
import {ActivityIndicator} from '../ActivityIndicator/ActivityIndicator';

type ButtonProps = {
  title: string;
  loading?: boolean;
  buttonVariant: ButtonVariant;
} & TouchableOpacityBoxProps;

export type ButtonVariant = 'fill' | 'outline' | 'danger';

export type ButtonUI = {
  container: TouchableOpacityBoxProps;
  contentColor: ThemeColors;
};

const buttonVariants: Record<ButtonVariant, ButtonUI> = {
  fill: {
    container: {
      backgroundColor: 'primary',
    },
    contentColor: 'primaryContrast',
  },
  outline: {
    container: {
      borderWidth: 1.5,
      borderColor: 'primary',
    },
    contentColor: 'primary',
  },
  danger: {
    container: {
      backgroundColor: 'error',
    },
    contentColor: 'grayWhite',
  },
};

export function Button({title, loading, buttonVariant, ...props}: ButtonProps) {
  const buttonVariantSelected = buttonVariants[buttonVariant];
  return (
    <TouchableOpacityBox
      activeOpacity={0.7}
      disabled={loading}
      paddingHorizontal="s20"
      height={50}
      alignItems="center"
      justifyContent="center"
      borderRadius="s16"
      {...buttonVariantSelected.container}
      {...props}>
      {loading ? (
        <ActivityIndicator
          size={32}
          color={buttonVariantSelected.contentColor}
        />
      ) : (
        <Text
          color={buttonVariantSelected.contentColor}
          preset="paragraphMedium"
          bold>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
