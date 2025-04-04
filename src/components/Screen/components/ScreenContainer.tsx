import React from 'react';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  children: React.ReactNode;
  backgroundColor: string;
}
export function ScrollViewContainer({children, backgroundColor}: Props) {
  const $scrollView: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor,
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={$scrollView}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({children, backgroundColor}: Props) {
  const $view: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor,
  };
  return <View style={$view}>{children}</View>;
}
