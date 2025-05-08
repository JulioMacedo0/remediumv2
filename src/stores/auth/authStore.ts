import {create} from 'zustand';
import {UserType} from '../../@types/userTypes';
import {authService, SignInRequest} from '../../services/auth/authService';
import {STORAGE_KEYS} from '../../services/storage/storegesKeys';
import {storageService} from '../../services/storage/storageService';
import {userService} from '../../services/user/userService';
import {CreateUserPayload} from '../../services/user/userType';
import {OneSignal} from 'react-native-onesignal';

type AuthState = {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;

  signIn: (payload: SignInRequest) => Promise<void>;
  signUp: (payload: CreateUserPayload, callBack: () => void) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  isLoading: false,

  signIn: async payload => {
    set({isLoading: true});

    try {
      const {accessToken, user} = await authService.signIn(payload);

      storageService.setItem(STORAGE_KEYS.TOKEN, accessToken);
      storageService.setItem(STORAGE_KEYS.USER, user);
      OneSignal.login(user.id);
      set({user, token: accessToken});
    } catch (err) {
      console.error('Erro no signIn:', err);
      throw err;
    } finally {
      set({isLoading: false});
    }
  },

  signUp: async (payload, callBack) => {
    set({isLoading: true});

    try {
      const user = await userService.create(payload);
      OneSignal.login(user.id);
      callBack();
    } catch (err) {
      console.error('Erro no signUp:', err);
      throw err;
    } finally {
      set({isLoading: false});
    }
  },

  logout: () => {
    storageService.removeItem(STORAGE_KEYS.TOKEN);
    storageService.removeItem(STORAGE_KEYS.USER);
    set({user: null, token: null});
  },

  restoreSession: async () => {
    const token = storageService.getItem('TOKEN');
    const user = storageService.getItem('USER');
    //simulate delay to ferify token
    await new Promise(resolve => setTimeout(resolve, 200));

    if (token && user) {
      OneSignal.login(user.id);
      set({token, user});
    }
  },
}));
