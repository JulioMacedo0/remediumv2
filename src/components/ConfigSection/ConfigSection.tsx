import React from 'react';
import {Box} from '../Box/Box';
import {Text} from '../Text/Text';
import {IconProps} from '../Icon/Icon';
import {ConfigButton} from '../ConfigButton/ConfigButton';

type BaseConfigAction = {
  key?: string;
};

type DefaultConfigAction = BaseConfigAction & {
  variant?: 'default';
  label: string;
  iconProps: IconProps;
  onPress: () => void;
};

type CustomRenderConfigAction = BaseConfigAction & {
  variant: 'custom';
  render: () => React.ReactNode;
};

type ConfigAction = DefaultConfigAction | CustomRenderConfigAction;

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
        {actions.map((action, index) => {
          if (action.variant === 'custom') {
            return (
              <React.Fragment key={action.key ?? index}>
                {action.render()}
              </React.Fragment>
            );
          }

          const {label, iconProps, onPress} = action;
          return (
            <ConfigButton
              key={action.key ?? index}
              iconProps={iconProps}
              label={label}
              onPress={onPress}
            />
          );
        })}
      </Box>
    </Box>
  );
}
