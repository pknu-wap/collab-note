import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export type UseQueryOptionsOf<T extends (...args: any) => any> =
  UseQueryOptions<
    Awaited<ReturnType<T>>,
    Error,
    Awaited<ReturnType<T>>,
    (string | number)[]
  >;

export type UseInfiniteQueryOptionsOf<T extends (...args: any) => any> =
  UseInfiniteQueryOptions<
    Awaited<ReturnType<T>>,
    Error,
    Awaited<ReturnType<T>>,
    Awaited<ReturnType<T>>,
    (string | number)[]
  >;

export type UseMutationOptionsOf<T extends (...args: any) => any> =
  UseMutationOptions<
    Awaited<ReturnType<T>>,
    Error,
    Parameters<T>[0] extends undefined ? void : Parameters<T>[0]
  >;
