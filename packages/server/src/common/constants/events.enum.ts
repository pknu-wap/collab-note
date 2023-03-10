export const EVENT = {} as const;

export type Event = (typeof EVENT)[keyof typeof EVENT];
