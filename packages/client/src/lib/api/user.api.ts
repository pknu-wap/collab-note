import { API_URL } from '~/constants';
import axiosInstance from './axiosInstance';
import { UserResponse } from '../types/user.types';

export const UserAPI = {
  getMe: async (): Promise<UserResponse | null> => {
    const { data } = await axiosInstance.get(API_URL.USER.GET_ME);
    return data;
  },
};
