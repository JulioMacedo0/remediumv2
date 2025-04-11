import React from 'react';
import {Box, TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';
import {Icon, IconProps} from '../Icon/Icon';

type ConfigAction = {
  label: string;
  iconProps: IconProps;
  onPress: () => void;
};

type ConfigSectionProps = {
  title: string;
  actions: ConfigAction[];
};

export function ConfigSection({title, actions}: ConfigSectionProps) {
  return (
    <Box mb="s24">
      <Text preset="paragraphMedium" mb="s4" color="primary">
        {title}
      </Text>

      <Box flexDirection="row" flexWrap="wrap" gap="s12">
        {actions.map(({label, iconProps, onPress}) => (
          <TouchableOpacityBox
            width={'100%'}
            activeOpacity={0.7}
            backgroundColor="primary"
            key={label}
            onPress={onPress}
            flexDirection="row"
            alignItems="center"
            borderRadius="s12"
            px="s12"
            py="s8">
            <Icon {...iconProps} size={18} />
            <Text color="grayWhite" ml="s8">
              {label}
            </Text>
          </TouchableOpacityBox>
        ))}
      </Box>
    </Box>
  );
}
