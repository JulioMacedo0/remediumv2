import {create} from 'zustand';
import {UserType} from '../../@types/userTypes';
import {authService, SignInRequest} from '../../services/auth/authService';
import {STORAGE_KEYS} from '../../services/storage/storegesKeys';
import {storageService} from '../../services/storage/storageService';
import {userService} from '../../services/user/userService';
import {CreateUserPayload} from '../../services/user/userType';
import {OneSignal} from 'react-native-onesignal';
import {logService} from '../../services/log/logService';
const logger = logService.scope('AuthStore');

type AuthState = {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;

  signIn: (payload: SignInRequest) => Promise<void>;
  signUp: (payload: CreateUserPayload, callBack: () => void) => Promise<void>;
  logout: () => void;
  restoreSession: () => Promise<void>;
  refreshToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  isLoading: false,

  signIn: async payload => {
    set({isLoading: true});

    try {
      const {accessToken, refreshToken, user} = await authService.signIn(
        payload,
      );

      storageService.setItem(STORAGE_KEYS.TOKEN, accessToken);
      storageService.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      storageService.setItem(STORAGE_KEYS.USER, user);
      OneSignal.login(user.id);
      set({user, token: accessToken});
    } catch (err) {
      logger.error('Sign in failed', undefined, err);
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
      logger.error('Sign up failed', undefined, err);
      throw err;
    } finally {
      set({isLoading: false});
    }
  },

  logout: () => {
    storageService.removeItem(STORAGE_KEYS.TOKEN);
    storageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    storageService.removeItem(STORAGE_KEYS.USER);
    OneSignal.logout();
    set({user: null, token: null});
    logger.log('User logged out');
  },

  refreshToken: async () => {
    set({isLoading: true});
    try {
      const {accessToken, refreshToken, user} =
        await authService.refreshToken();

      storageService.setItem(STORAGE_KEYS.TOKEN, accessToken);
      storageService.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      storageService.setItem(STORAGE_KEYS.USER, user);

      set({user, token: accessToken});
      logger.log('Token refreshed successfully');
    } catch (err) {
      logger.error('Token refresh failed', undefined, err);
      set({user: null, token: null});
      throw err;
    } finally {
      set({isLoading: false});
    }
  },

  restoreSession: async () => {
    try {
      logger.log('Fetching token and user from storage');
      const token = storageService.getItem(STORAGE_KEYS.TOKEN);
      const refreshToken = storageService.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      const user = storageService.getItem(STORAGE_KEYS.USER);

      if (token && user) {
        logger.log('Token and user found, logging in with OneSignal');
        await Promise.resolve(OneSignal.login(user.id));
        logger.log('OneSignal login completed');
        set({token, user});
      } else if (refreshToken) {
        logger.log('Attempting to renew session with refresh token');
        await useAuthStore.getState().refreshToken();
      } else {
        logger.log('No token or user found');
      }
    } catch (error) {
      logger.error('Session restoration failed', undefined, error);
      storageService.removeItem(STORAGE_KEYS.TOKEN);
      storageService.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      storageService.removeItem(STORAGE_KEYS.USER);
    }
  },
}));
