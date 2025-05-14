import React from 'react';
import {AppTabScreenProps} from '../../../routes/navigationType';

import {Screen} from '../../../components/Screen/Screen';
import {AlertList} from '../../../components/AlertList/AlertList';
import {Alert} from '../../../services/alert/alertTypes';

export function HomeScreen({navigation}: AppTabScreenProps<'HomeScreen'>) {
  const handleAlertPress = (alert: Alert) => {
    navigation.navigate('EditAlertScreen', {
      alertId: alert.id,
    });
  };

  return (
    <Screen title="Seus alertas">
      <AlertList onAlertPress={handleAlertPress} />
    </Screen>
  );
}
