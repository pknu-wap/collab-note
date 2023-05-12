import { MutableRefObject } from 'react';
import * as S from './Tooltip.styles';
import { createPortal } from 'react-dom';
import usePortal from '~/hooks/usePortal';
import { Placement } from './placement';

interface TooltipContentProps {
  placement?: Placement;
  visible: boolean;
  children?: React.ReactNode;
  parent?: MutableRefObject<HTMLElement | null> | undefined;
}

const TooltipContent = ({
  placement = 'top',
  visible,
  children,
  parent,
}: TooltipContentProps) => {
  const el = usePortal('tooltip');

  if (!parent) return null;

  if (!el) return null;

  return createPortal(
    <S.StyledTooltipContent visible={visible}>
      <S.StyledTooltip>
        <S.StyledTooltipArrow />
        {children}
      </S.StyledTooltip>
    </S.StyledTooltipContent>,
    el,
  );
};

export default TooltipContent;
