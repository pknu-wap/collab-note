import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledTooltipTrigger = styled.div`
  width: max-content;
  display: inherit;
`;

export const StyledTooltipContent = styled.div<{ visible: boolean }>`
  position: absolute;
  display: none;
  background-color: #ccc;
  border-radius: 14px;
  padding: 8px 12px;
  transition: opacity 0.25s ease 0s, top 0.25s ease 0s;
  ${({ visible }) =>
    visible &&
    css`
      display: block;
      opacity: 1;
    `};
`;

export const StyledTooltip = styled.div`
  position: relative;
  font-size: 14px;
  color: #fff;
  line-height: 1.5;
`;
