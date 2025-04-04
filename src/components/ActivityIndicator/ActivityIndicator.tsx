import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native';

import {useTheme} from '@shopify/restyle';
import {Theme, ThemeColors} from '../../theme/theme';

type ActivityIndicatorProps = {
  color: ThemeColors;
} & RNActivityIndicatorProps;

export function ActivityIndicator({color, ...props}: ActivityIndicatorProps) {
  const {colors} = useTheme<Theme>();
  return <RNActivityIndicator color={colors[color]} {...props} />;
}
