import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuthStore} from '../stores/auth/authStore';
import {SplashScreen} from '../components/SplashScreen/SplashScreen';

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
    <NavigationContainer>
      {restoring ? <SplashScreen /> : token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
