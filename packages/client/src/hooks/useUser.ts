import { useQueryClient } from '@tanstack/react-query';
import { UserResponse } from '~/lib/types';
import { useGetMe } from './queries/user';

const useUser = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserResponse>(useGetMe.getKey());
  return user as UserResponse;
};

export default useUser;
