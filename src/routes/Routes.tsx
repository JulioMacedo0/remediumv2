import React, {useEffect, useState, useCallback} from 'react';
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
  const userIsAutenticated = useAuthStore(s => s.token);
  const restoreSession = useAuthStore(s => s.restoreSession);
  const [restoring, setRestoring] = useState(true);
  const [sessionRestored, setSessionRestored] = useState(false);
  const [splashAnimationComplete, setSplashAnimationComplete] = useState(false);

  const restoreSessionFn = useCallback(async () => {
    await restoreSession();
    setSessionRestored(true);
  }, [restoreSession]);

  const handleSplashAnimationComplete = useCallback(() => {
    setSplashAnimationComplete(true);
    setRestoring(false);
  }, []);

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(env.ONE_SIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(false);
  }, []);

  useEffect(() => {
    restoreSessionFn();
  }, [restoreSessionFn]);

  const showSplashScreen = restoring || !splashAnimationComplete;
  return (
    <GestureHandlerRootView style={$style.container}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          {userIsAutenticated ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
        {showSplashScreen && (
          <SplashScreen
            isSessionRestored={sessionRestored}
            onAnimationComplete={handleSplashAnimationComplete}
          />
        )}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const $style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
