import React from 'react';

import {
  ArrowLeft,
  Camera,
  FlipVertical,
  X,
  IconProps as phosphorIconProps,
} from 'phosphor-react-native';
import {TouchableOpacityBox, TouchableOpacityBoxProps} from '../Box/Box';
import {useAppTheme} from '../../hooks/UseAppTheme/UseAppTheme';

//type IconKeys = keyof typeof icons;

type IconNames = 'ArrowLeft' | 'Camera' | 'EllipsisVertical' | 'X';

type IconProps = {
  name: IconNames;
  touchableOpacityBoxProps?: TouchableOpacityBoxProps;
} & phosphorIconProps;

export function Icon({name, touchableOpacityBoxProps, ...props}: IconProps) {
  const {colors} = useAppTheme();

  const baseStyle: phosphorIconProps = {
    color: colors.primary,
    size: 28,
  };
  const IconCustom = createIcon(name);
  return (
    <TouchableOpacityBox activeOpacity={0.7} {...touchableOpacityBoxProps}>
      <IconCustom {...baseStyle} {...props} />
    </TouchableOpacityBox>
  );
}

function createIcon(name: IconNames) {
  switch (name) {
    case 'ArrowLeft':
      return ArrowLeft;
    case 'Camera':
      return Camera;
    case 'EllipsisVertical':
      return FlipVertical;
    default:
      return X;
  }
}
