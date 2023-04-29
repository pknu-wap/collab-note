import { UserAPI } from '~/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

export const useGetMe = (
  options: UseQueryOptionsOf<typeof UserAPI.getMe> = {},
) => {
  return useQuery(getKey(), fetcher(), options);
};

const getKey = () => ['useGetMe'];
const fetcher = () => async () => await UserAPI.getMe();

useGetMe.getKey = getKey;
useGetMe.fetcher = fetcher;
