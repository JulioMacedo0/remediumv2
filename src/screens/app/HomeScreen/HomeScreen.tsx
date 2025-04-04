import React from 'react';
import {AppTabScreenProps} from '../../../routes/navigationType';
import {Screen} from 'react-native-screens';
import {Text} from '../../../components/Text/Text';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  return (
    <Screen>
      <Text>Home</Text>
    </Screen>
  );
}
