import {TouchableOpacityBox} from '../Box/Box';
import {Icon, IconProps} from '../Icon/Icon';
import {Text} from '../Text/Text';

export type ConfigButtonProps = {
  label: string;
  iconProps: IconProps;
  loading?: boolean;
  onPress: () => void;
};

export function ConfigButton({iconProps, label, onPress}: ConfigButtonProps) {
  return (
    <TouchableOpacityBox
      key={label}
      width="100%"
      activeOpacity={0.7}
      backgroundColor="primary"
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
  );
}
