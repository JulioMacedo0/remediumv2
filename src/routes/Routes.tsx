import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuthStore} from '../stores/auth/authStore';
import {SplashScreen} from '../components/SplashScreen/SplashScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export function Router() {
  const token = useAuthStore(s => s.token);
  const restoreSession = useAuthStore(s => s.restoreSession);
  const [restoring, setRestoring] = useState(true);

  const restoreSessionFn = async () => {
    await restoreSession();
    setRestoring(false);
  };

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
