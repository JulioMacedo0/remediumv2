import React from 'react';
import {Screen} from '../../../components/Screen/Screen';

import {useAuthStore} from '../../../stores/auth/authStore';
import {ConfigSection} from '../../../components/ConfigSection/ConfigSection';

export function SettingsScreen() {
  const logout = useAuthStore(s => s.logout);

  return (
    <Screen title="Configurações" scrollabe>
      <ConfigSection
        title="Tema"
        actions={[
          {
            label: 'Claro',
            iconProps: {
              name: 'Sun',
              color: 'yellow',
            },
            onPress: () => console.log('Tema claro'),
          },
        ]}
      />

      <ConfigSection
        title="Cor "
        actions={[
          {
            label: 'Verde',
            iconProps: {
              name: 'Palette',
              color: 'grayWhite',
            },
            onPress: () => console.log('Tema claro'),
          },
        ]}
      />

      <ConfigSection
        title="Idioma"
        actions={[
          {
            label: 'Português',
            iconProps: {
              name: 'Languages',
              color: 'grayWhite',
            },
            onPress: () => console.log('Idioma en'),
          },
        ]}
      />

      <ConfigSection
        title="Sessão"
        actions={[
          {
            label: 'Sair',
            iconProps: {
              name: 'X',
              color: 'redError',
            },
            onPress: logout,
          },
        ]}
      />
    </Screen>
  );
}
