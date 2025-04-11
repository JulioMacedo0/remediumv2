import React from 'react';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {mapScreenToProps} from './mapScreenToProps';
import {StyleProp, ViewStyle} from 'react-native';
import {useAppSafeArea} from '../hooks/UseAppSafeArea/UseAppSafeArea';
import {AppTabBottomTabParamList} from './AppTabNavigator';
import {
  Box,
  BoxProps,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '../components/Box/Box';
import {Icon} from '../components/Icon/Icon';
import {Text, TextProps} from '../components/Text/Text';

export function AppTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {bottom} = useAppSafeArea();
  return (
    <Box {...$boxWrapper} style={[{paddingBottom: bottom}, $shadowProps]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const tabItem =
          mapScreenToProps[route.name as keyof AppTabBottomTabParamList];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacityBox
            key={route.name}
            {...$itemWrapper}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            //testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={$baseTouchableProps}>
            <Icon
              color={isFocused ? 'primary' : 'gray1'}
              name={tabItem.icon}
              // fill={isFocused ? 'primary' : 'gray1'}
            />
            <Text {...$label} color={isFocused ? 'primary' : 'gray1'}>
              {tabItem.label}
            </Text>
          </TouchableOpacityBox>
        );
      })}
    </Box>
  );
}
const $baseTouchableProps: StyleProp<ViewStyle> = {
  flex: 1,
};
const $shadowProps: ViewStyle = {
  elevation: 10,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: {width: 0, height: -3},
};

const $label: TextProps = {
  semiBold: true,
  marginTop: 's4',
  preset: 'paragraphCaption',
};

const $itemWrapper: TouchableOpacityBoxProps = {
  activeOpacity: 1,
  alignItems: 'center',
  accessibilityRole: 'button',
};

const $boxWrapper: BoxProps = {
  paddingTop: 's12',
  backgroundColor: 'background',
  flexDirection: 'row',
};
