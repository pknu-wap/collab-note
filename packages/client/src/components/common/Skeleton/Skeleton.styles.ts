import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shine = keyframes`  
    0% {
      opacity: 0.2;    
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.2;
    }
`;

export const Root = styled.div<{ circle: boolean }>`
  border-radius: 14px;
  width: 250px;
  height: 100px;
  display: flex;
  background-color: #dee2e6;
  animation: ${shine} 1.2s infinite ease-in-out;
  ${({ circle }) =>
    circle &&
    css`
      border-radius: 50%;
      width: 100px;
      height: 100px;
    `}
`;
