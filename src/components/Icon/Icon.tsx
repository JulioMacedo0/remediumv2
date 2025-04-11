import React from 'react';

import {
  Camera,
  ArrowLeft,
  EllipsisVertical,
  X,
  LucideProps,
  Settings,
  Home,
  Plus,
} from 'lucide-react-native';

import {Box, TouchableOpacityBox, TouchableOpacityBoxProps} from '../Box/Box';
import {useAppTheme} from '../../hooks/UseAppTheme/UseAppTheme';
import {ThemeColors} from '../../theme/theme';

export type IconNames =
  | 'ArrowLeft'
  | 'Camera'
  | 'EllipsisVertical'
  | 'X'
  | 'Settings'
  | 'Home'
  | 'Plus';

type IconProps = {
  name: IconNames;
  color?: ThemeColors;
  touchableOpacityBoxProps?: TouchableOpacityBoxProps;
} & Omit<LucideProps, 'color'>;

const iconMap: Record<IconNames, React.ComponentType<LucideProps>> = {
  ArrowLeft,
  Camera,
  EllipsisVertical,
  X,
  Settings,
  Home,
  Plus,
};

export function Icon({
  name,
  color = 'primary',
  touchableOpacityBoxProps,
  onPress,
  ...props
}: IconProps) {
  const {colors} = useAppTheme();

  const baseStyle: LucideProps = {
    color: colors[color],
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
  return iconMap[name] ?? X;
}
