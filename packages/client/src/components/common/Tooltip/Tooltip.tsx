import TooltipContent from './TooltipContent';
import * as S from './Tooltip.styles';
import { useRef, useState } from 'react';
import { Placement } from './placement';

export interface TooltipProps {
  children: React.ReactNode;
  placement?: Placement;
  content?: React.ReactNode;
}

const Tooltip = ({
  children,
  placement = 'top',
  content,
  ...props
}: TooltipProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const contentProps = {
    placement,
    parent: ref,
    visible,
  };

  const handleChangeVisible = (nextState: boolean) => {
    setVisible(nextState);
  };

  return (
    <S.StyledTooltipTrigger
      ref={ref}
      onMouseEnter={() => handleChangeVisible(true)}
      onMouseLeave={() => handleChangeVisible(false)}
      {...props}
    >
      {children}
      {content ? (
        <TooltipContent {...contentProps}>{content}</TooltipContent>
      ) : null}
      {/* null을 사용하지 않으면, TooltipContent가 렌더링되지 않는다. */}
    </S.StyledTooltipTrigger>
  );
};

export default Tooltip;
