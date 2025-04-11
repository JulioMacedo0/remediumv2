import {api} from '../../api/httpClient';
import {getLocales, getTimeZone} from 'react-native-localize';
import {CreateUserPayload, UpdateUserPayload, UserType} from './userType';
import {showToastSuccess} from '../toast/toastService';

export const userService = {
  async create(payload: CreateUserPayload): Promise<UserType> {
    const languageTag = getLocales()[0].languageTag;
    const timeZone = getTimeZone();
    const payloadWithLocale = {
      ...payload,
      languageTag,
      timeZone,
    };
    console.log(payloadWithLocale);
    const res = await api.post<UserType>('users', payloadWithLocale);
    showToastSuccess('Usuário criado com sucesso');
    return res.data;
  },

  async getAll(): Promise<UserType[]> {
    const res = await api.get<UserType[]>('users');
    return res.data;
  },

  async getOne(): Promise<UserType> {
    const res = await api.get<UserType>('users/one');
    return res.data;
  },

  async update(payload: UpdateUserPayload): Promise<UserType> {
    const res = await api.patch<UserType>('users', payload);
    return res.data;
  },

  async remove(): Promise<UserType> {
    const res = await api.delete<UserType>('users');
    return res.data;
  },
};
