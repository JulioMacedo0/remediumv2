import React, {useEffect, useState} from 'react';
import {Linking, AppState, AppStateStatus} from 'react-native';
import {OneSignal, OSNotificationPermission} from 'react-native-onesignal';
import {TouchableOpacityBox} from '../Box/Box';
import {Text} from '../Text/Text';
import {Icon, IconNames} from '../Icon/Icon';
import {ThemeColors} from '../../theme/theme';
import {ActivityIndicator} from '../ActivityIndicator/ActivityIndicator';

export function PermissionNotificationButton() {
  const [permission, setPermission] = useState<OSNotificationPermission | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const fetchPermission = async () => {
    try {
      setLoading(true);
      const status = await OneSignal.Notifications.permissionNative();
      setPermission(status);
    } catch (error) {
      console.warn('Erro ao obter permissão do OneSignal:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermission();

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      fetchPermission();
    }
  };

  const handlePress = async () => {
    if (permission === 2) {
      return;
    }
    if (permission === 1) {
      Linking.openSettings();
    } else {
      await OneSignal.Notifications.requestPermission(true);
      fetchPermission();
    }
  };

  const {label, bg, icon} = getPermissionLabelAndColor(permission);

  return (
    <TouchableOpacityBox
      width="100%"
      backgroundColor={'primary'}
      onPress={handlePress}
      flexDirection="row"
      alignItems="center"
      borderRadius="s12"
      px="s12"
      py="s8"
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator size={18} color="grayWhite" />
      ) : (
        <>
          <Icon name={icon} size={18} color={bg} />
          <Text ml="s8" color="grayWhite">
            {label}
          </Text>
        </>
      )}
    </TouchableOpacityBox>
  );
}

function getPermissionLabelAndColor(
  permission: OSNotificationPermission | null,
): {label: string; bg: ThemeColors; icon: IconNames} {
  switch (permission) {
    case 2:
      return {
        label: 'Notificações permitidas',
        bg: 'grayWhite',
        icon: 'Bell',
      };
    case 1:
      return {
        label: 'Permissão negada. Vá para as configurações.',
        bg: 'error',
        icon: 'BellOff',
      };
    case 3:
      return {
        label: 'Notificações ativas (modo Provisional)',
        bg: 'yellow',
        icon: 'BellMinus',
      };
    case 4:
      return {
        label: 'Notificações ativas (modo temporário)',
        bg: 'yellow',
        icon: 'BellMinus',
      };
    case 0:
    default:
      return {label: 'Permitir notificações', bg: 'error', icon: 'BellOff'};
  }
}
