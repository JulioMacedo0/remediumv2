import React, {useEffect, useState} from 'react';
import {AppScreenProps} from '../../../routes/navigationType';
import {Screen} from '../../../components/Screen/Screen';
import {AlertForm} from '../../../components/AlertForm/AlertForm';
import {Alert} from '../../../services/alert/alertTypes';
import {alertService} from '../../../services/alert/alertService';
import {ActivityIndicator} from '../../../components/ActivityIndicator/ActivityIndicator';
import {Box} from '../../../components/Box/Box';
import {showToastError} from '../../../services/toast/toastService';

export function EditAlertScreen({
  route,
  navigation,
}: AppScreenProps<'EditAlertScreen'>) {
  const {alertId} = route.params;
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const data = await alertService.getOne(alertId);
        setAlert(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do alerta:', error);
        showToastError('Não foi possível carregar os detalhes do alerta');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchAlert();
  }, [alertId, navigation]);

  const handleSuccess = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <Screen title="Editar Alerta" canGoBack>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator color="primary" size="large" />
        </Box>
      </Screen>
    );
  }

  return (
    <Screen title="Editar Alerta" scrollabe canGoBack>
      {alert && (
        <AlertForm
          mode="edit"
          initialAlert={alert}
          alertId={alertId}
          onSuccess={handleSuccess}
        />
      )}
    </Screen>
  );
}
