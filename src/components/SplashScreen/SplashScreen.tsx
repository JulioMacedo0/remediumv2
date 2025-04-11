import React from 'react';
import {Screen} from '../Screen/Screen';
import {ActivityIndicator} from '../ActivityIndicator/ActivityIndicator';
import {Box} from '../Box/Box';

export function SplashScreen() {
  return (
    <Screen>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator color="primary" size={120} />
      </Box>
    </Screen>
  );
}
