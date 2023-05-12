import { MutableRefObject, useEffect, useState } from 'react';
import * as S from './Tooltip.styles';
import { createPortal } from 'react-dom';
import usePortal from '~/hooks/usePortal';
import {
  Placement,
  TooltipPlacement,
  defaultTooltipPlacement,
  getPlacement,
  getRect,
} from './placement';

interface TooltipContentProps {
  placement?: Placement;
  visible: boolean;
  children?: React.ReactNode;
  parent?: MutableRefObject<HTMLElement | null> | undefined;
  offset?: number;
}

const TooltipContent = ({
  placement = 'top',
  visible,
  children,
  offset = 12,
  parent,
}: TooltipContentProps) => {
  const el = usePortal('tooltip');
  const [rect, setRect] = useState<TooltipPlacement>(defaultTooltipPlacement);

  if (!parent) return null;

  const updateRect = () => {
    const pos = getPlacement(placement, getRect(parent), offset);

    setRect(pos);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    updateRect();
  }, [visible]);

  if (!el) return null;

  return createPortal(
    <S.StyledTooltipContent
      visible={visible}
      style={{
        left: rect.left,
        top: rect.top,
        transform: rect.transform,
      }}
    >
      <S.StyledTooltip>{children}</S.StyledTooltip>
    </S.StyledTooltipContent>,
    el,
  );
};

export default TooltipContent;
