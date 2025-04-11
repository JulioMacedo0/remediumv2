import {create} from 'zustand';
import {UserType} from '../../@types/userTypes';
import {authService, SignInRequest} from '../../services/auth/authService';
import {STORAGE_KEYS} from '../../services/storage/storegesKeys';
import {storageService} from '../../services/storage/storageService';

type AuthState = {
  user: UserType | null;
  token: string | null;
  isLoading: boolean;

  signIn: (payload: SignInRequest) => Promise<void>;
  // signUp: (payload: SignInRequest) => Promise<void>;
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

      set({user, token: accessToken});
    } catch (err) {
      console.error('Erro no signIn:', err);
      throw err;
    } finally {
      set({isLoading: false});
    }
  },

  //   signUp: async (payload) => {
  //     set({ isLoading: true });

  //     try {
  //       const user = await authService.signUp(payload);

  //       // Se quiser logar automaticamente:
  //       const { accessToken } = await authService.signIn({
  //         email: payload.email,
  //         password: payload.password,
  //       });

  //       storageService.setItem(STORAGE_KEYS.TOKEN, accessToken);
  //       storageService.setItem(STORAGE_KEYS.USER, user);

  //       set({ user, token: accessToken });
  //     } catch (err) {
  //       console.error('Erro no signUp:', err);
  //       throw err;
  //     } finally {
  //       set({ isLoading: false });
  //     }
  //   },

  logout: () => {
    storageService.removeItem(STORAGE_KEYS.TOKEN);
    storageService.removeItem(STORAGE_KEYS.USER);
    set({user: null, token: null});
  },

  restoreSession: async () => {
    const token = storageService.getItem<string>(STORAGE_KEYS.TOKEN);
    const user = storageService.getItem<UserType>(STORAGE_KEYS.USER);
    //simulate delay to ferify token
    await new Promise(resolve => setTimeout(resolve, 3000));
    if (token && user) {
      set({token, user});
    }
  },
}));
