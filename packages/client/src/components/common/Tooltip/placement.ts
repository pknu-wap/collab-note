import { MutableRefObject } from 'react';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

interface ParentDomRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface ReactiveDomReact {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

// defaultRect는 보이지 않는 상태에서의 위치를 잡기 위한 값
const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  bottom: -1000,
  width: 0,
  height: 0,
};

export interface TooltipPlacement {
  top: string;
  left: string;
  transform: string;
}

export const defaultTooltipPlacement = {
  top: '-1000px',
  left: '-1000px',
  transform: 'none',
};

export const getRect = (ref: MutableRefObject<HTMLElement | null>) => {
  if (!ref || !ref.current) return defaultRect;

  const rect = ref.current.getBoundingClientRect();

  return {
    ...rect,
    width: rect.width || rect.right - rect.left,
    height: rect.height || rect.bottom - rect.top,
    top: rect.top + document.documentElement.scrollTop,
    bottom: rect.bottom + document.documentElement.scrollTop,
    left: rect.left + document.documentElement.scrollLeft,
    right: rect.right + document.documentElement.scrollLeft,
  };
};

export const getPlacement = (
  placement: Placement,
  rect: ParentDomRect,
  offset: number,
) => {
  const placements = {
    top: {
      top: `${rect.top - offset}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, -100%)',
    },
    bottom: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, 0)',
    },
    left: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.left - offset}px`,
      transform: 'translate(-100%, -50%)',
    },
    right: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + offset}px`,
      transform: 'translate(0, -50%)',
    },
  };

  return placements[placement];
};
