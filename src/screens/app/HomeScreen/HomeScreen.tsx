import React from 'react';
import {AppTabScreenProps} from '../../../routes/navigationType';

import {Text} from '../../../components/Text/Text';
import {Screen} from '../../../components/Screen/Screen';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  return (
    <Screen title="Remedium">
      <Text>Home</Text>
    </Screen>
  );
}
