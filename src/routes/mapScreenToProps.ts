import {IconNames} from '../components/Icon/Icon';
import {AppTabBottomTabParamList} from './AppTabNavigator';

export const mapScreenToProps: Record<
  keyof AppTabBottomTabParamList,
  {
    label: string;
    icon: IconNames;
  }
> = {
  HomeScreen: {
    label: 'Início',
    icon: 'Home',
  },
  CreateAlertScreen: {
    label: 'Criar alerta',
    icon: 'Plus',
  },
  SettingsScreen: {
    label: 'Configurações',
    icon: 'Settings',
  },
};
