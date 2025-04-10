import React from 'react';
import {AppTabScreenProps} from '../../../routes/navigationType';

import {Text} from '../../../components/Text/Text';
import {Screen} from '../../../components/Screen/Screen';

export function SettingsScreen({}: AppTabScreenProps<'SettingsScreen'>) {
  return (
    <Screen scrollabe>
      <Text>Settings</Text>
    </Screen>
  );
}
