import { API_URL } from '~/constants';
import axiosInstance from './axiosInstance';

export const AuthAPI = {
  logout: async (): Promise<void> => {
    const { data } = await axiosInstance.delete(API_URL.AUTH.LOGOUT);
    return data;
  },
};
