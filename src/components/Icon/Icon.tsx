import React from 'react';

import {
  Camera,
  ArrowLeft,
  EllipsisVertical,
  X,
  LucideProps,
} from 'lucide-react-native';

import {Box, TouchableOpacityBox, TouchableOpacityBoxProps} from '../Box/Box';
import {useAppTheme} from '../../hooks/UseAppTheme/UseAppTheme';

//type IconKeys = keyof typeof icons;

type IconNames = 'ArrowLeft' | 'Camera' | 'EllipsisVertical' | 'X';

type IconProps = {
  name: IconNames;
  touchableOpacityBoxProps?: TouchableOpacityBoxProps;
} & LucideProps;

export function Icon({
  name,
  touchableOpacityBoxProps,
  onPress,
  ...props
}: IconProps) {
  const {colors} = useAppTheme();

  const baseStyle: LucideProps = {
    color: colors.primary,
    size: 28,
  };
  const IconCustom = createIcon(name);

  if (onPress) {
    return (
      <TouchableOpacityBox
        activeOpacity={0.7}
        onPress={onPress}
        {...touchableOpacityBoxProps}>
        <IconCustom {...baseStyle} {...props} />
      </TouchableOpacityBox>
    );
  }

  return (
    <Box>
      <IconCustom {...baseStyle} {...props} />
    </Box>
  );
}

function createIcon(name: IconNames) {
  switch (name) {
    case 'ArrowLeft':
      return ArrowLeft;
    case 'Camera':
      return Camera;
    case 'EllipsisVertical':
      return EllipsisVertical;
    default:
      return X;
  }
}
