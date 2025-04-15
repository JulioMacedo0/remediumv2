import React, {useEffect} from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/app/HomeScreen/HomeScreen';
import {CreateAlertScreen} from '../screens/app/CreateAlertScreen/CreateAlertScreen';
import {SettingsScreen} from '../screens/app/SettingsScreen/SettingsScreen';
import {AppTabBar} from './ AppTabBar';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {env} from '../env';

export type AppTabBottomTabParamList = {
  HomeScreen: undefined;
  CreateAlertScreen: undefined;
  SettingsScreen: undefined;
};

const Tab = createBottomTabNavigator<AppTabBottomTabParamList>();

export function AppTabNavigator() {
  useEffect(() => {
    // Enable verbose logging for debugging (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // Initialize with your OneSignal App ID
    OneSignal.initialize(env.ONE_SIGNAL_APP_ID);
    // Use this method to prompt for push notifications.
    // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
    OneSignal.Notifications.requestPermission(false);
  }, []);

  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />;
  }
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CreateAlertScreen" component={CreateAlertScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
