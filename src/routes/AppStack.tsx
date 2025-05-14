import React from 'react';

import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppTabBottomTabParamList, AppTabNavigator} from './AppTabNavigator';
import {EditAlertScreen} from '../screens/app/EditAlertScreen/EditAlertScreen';

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamList>;
  EditAlertScreen: {alertId: string};
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="AppTabNavigator"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}>
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Stack.Screen name="EditAlertScreen" component={EditAlertScreen} />
    </Stack.Navigator>
  );
}
