import React from 'react';
import {AppTabScreenProps} from '../../../routes/navigationType';

import {Text} from '../../../components/Text/Text';
import {Screen} from '../../../components/Screen/Screen';

export function CreateAlertScreen({}: AppTabScreenProps<'CreateAlertScreen'>) {
  return (
    <Screen scrollabe>
      <Text>Alert</Text>
    </Screen>
  );
}
