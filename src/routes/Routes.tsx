import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuthStore} from '../stores/auth/authStore';
import {SplashScreen} from '../components/SplashScreen/SplashScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {env} from '../env';

export function Router() {
  const token = useAuthStore(s => s.token);
  const restoreSession = useAuthStore(s => s.restoreSession);
  const [restoring, setRestoring] = useState(true);

  const restoreSessionFn = async () => {
    await restoreSession();
    setRestoring(false);
  };

  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize with your OneSignal App ID
    OneSignal.initialize(env.ONE_SIGNAL_APP_ID);
    // Use this method to prompt for push notifications.
    // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
    OneSignal.Notifications.requestPermission(false);
  }, []);

  useEffect(() => {
    restoreSessionFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView style={$style.container}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          {restoring ? <SplashScreen /> : token ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
const $style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
