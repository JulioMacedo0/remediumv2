import React from 'react';
import {AppTabScreenProps} from '../../../routes/navigationType';

import {Screen} from '../../../components/Screen/Screen';
import {AlertForm} from '../../../components/AlertForm/AlertForm';

export function CreateAlertScreen({}: AppTabScreenProps<'CreateAlertScreen'>) {
  return (
    <Screen title="Criar alerta" scrollabe>
      <AlertForm />
    </Screen>
  );
}
