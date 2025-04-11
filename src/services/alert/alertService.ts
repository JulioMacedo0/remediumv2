import {api} from '../../api/httpClient';
import {Alert, CreateAlertDto, UpdateAlertDto} from './alertTypes';

export const alertService = {
  async create(payload: CreateAlertDto): Promise<Alert> {
    const res = await api.post<Alert>('alerts', payload);
    return res.data;
  },

  async getAll(): Promise<Alert[]> {
    const res = await api.get<Alert[]>('alerts');
    return res.data;
  },

  async getOne(id: string): Promise<Alert> {
    const res = await api.get<Alert>(`alerts/${id}`);
    return res.data;
  },

  async update(id: string, payload: UpdateAlertDto): Promise<Alert> {
    const res = await api.patch<Alert>(`alerts/${id}`, payload);
    return res.data;
  },

  async remove(id: string): Promise<Alert> {
    const res = await api.delete<Alert>(`alerts/${id}`);
    return res.data;
  },
};
