import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Box, BoxProps, TouchableOpacityBox} from '../Box/Box';

import {Text} from '../Text/Text';
import {useAppTheme} from '../../hooks/UseAppTheme/UseAppTheme';
import {ScrollViewContainer, ViewContainer} from './components/ScreenContainer';
import {useAppSafeArea} from '../../hooks/UseAppSafeArea/UseAppSafeArea';
import {Icon} from '../Icon/Icon';

interface ScreenProps {
  children: ReactNode;
  title?: string;
  canGoBack?: boolean;
  scrollabe?: boolean;
  boxProps?: BoxProps;
}

export function Screen({
  scrollabe,
  canGoBack = false,
  title,
  children,
  boxProps,
}: ScreenProps) {
  const {colors} = useAppTheme();
  const Container = scrollabe ? ScrollViewContainer : ViewContainer;
  const navigation = useNavigation();
  const {top, bottom} = useAppSafeArea();

  const $keyboardAvoidingView: StyleProp<ViewStyle> = {
    flex: 1,
  };
  StatusBar.setBarStyle('dark-content', true);
  return (
    <KeyboardAvoidingView
      style={$keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background}>
        <Box
          flex={1}
          paddingHorizontal="s14"
          backgroundColor="background"
          {...boxProps}
          style={{paddingTop: top, paddingBottom: bottom}}>
          <Box flexDirection="row" alignItems="center" mb="s10">
            {canGoBack && (
              <TouchableOpacityBox
                activeOpacity={0.7}
                mr="s10"
                onPress={() => navigation.goBack()}
                flexDirection="row"
                alignItems="center">
                <Icon name="ArrowLeft" />
              </TouchableOpacityBox>
            )}
            {title && (
              <Text
                preset="headingLarge"
                color="primary"
                semiBold
                textAlign="center">
                {title}
              </Text>
            )}
          </Box>

          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
