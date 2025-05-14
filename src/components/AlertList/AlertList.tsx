import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, ListRenderItemInfo} from 'react-native';
import {alertService} from '../../services/alert/alertService';
import {Alert} from '../../services/alert/alertTypes';
import {AlertCard} from '../AlertCard/AlertCard';
import {Box} from '../Box/Box';
import {Text} from '../Text/Text';
import {ActivityIndicator} from '../ActivityIndicator/ActivityIndicator';

type AlertListProps = {
  onAlertPress?: (alert: Alert) => void;
};

export function AlertList({onAlertPress}: AlertListProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await alertService.getAll();
      setAlerts(data);
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAlerts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const renderItem = ({item}: ListRenderItemInfo<Alert>) => (
    <AlertCard
      alert={item}
      onPress={onAlertPress ? () => onAlertPress(item) : undefined}
    />
  );

  if (loading && !refreshing) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator color="primary" size="large" />
      </Box>
    );
  }
  const $flasListStyle = {padding: 16};
  return (
    <FlatList
      data={alerts}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={$flasListStyle}
      ListEmptyComponent={
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="s24"
          height={200}>
          <Text preset="paragraphMedium" color="primary" textAlign="center">
            Você ainda não possui alertas cadastrados.
          </Text>
        </Box>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
}
