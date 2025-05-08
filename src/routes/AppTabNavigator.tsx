import React from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/app/HomeScreen/HomeScreen';
import {CreateAlertScreen} from '../screens/app/CreateAlertScreen/CreateAlertScreen';
import {SettingsScreen} from '../screens/app/SettingsScreen/SettingsScreen';
import {AppTabBar} from './ AppTabBar';

export type AppTabBottomTabParamList = {
  HomeScreen: undefined;
  CreateAlertScreen: undefined;
  SettingsScreen: undefined;
};

const Tab = createBottomTabNavigator<AppTabBottomTabParamList>();

export function AppTabNavigator() {
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
