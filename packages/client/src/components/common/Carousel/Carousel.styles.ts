import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { hideScrollbar } from '~/lib/styles';

export const SideButton = styled.button<{ hidden: boolean }>`
  position: absolute;
  top: 50%;

  cursor: pointer;
  // user-select: none는 사용자가 텍스트를 선택하지 못하게 하는 것을 말한다.
  user-select: none;
  /* pointer-events: all; */

  display: flex;
  justify-content: center;
  align-items: center;

  height: 64px;
  width: 54px;
  border-radius: 1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);

  // blur는 흐림 효과를 주는 것을 말한다.
  backdrop-filter: blur(20px);
  filter: blur(1rem);

  transition: all 0.3s ease;
  opacity: 0;
  z-index: 5;

  svg {
    width: 32px;
    height: 24px;
    color: #fff;
  }

  ${({ hidden }) =>
    hidden &&
    css`
      visibility: hidden;
      transition: all 0.3s ease;
      opacity: 0;
      filter: blur(30px);
    `};
`;

export const Container = styled.div`
  position: relative;
  width: 100%;

  &:hover {
    ${SideButton} {
      opacity: 1;
      transform: translateY(-50%);
      filter: blur(0px);
    }
  }

  .next {
    right: 1rem;
  }
  .prev {
    left: 1rem;
  }
`;

export const HorizontalScrollPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  overflow-x: scroll;
  scroll-behavior: smooth;
  // overscroll-behavior-x은 스크롤이 끝에 도달했을 때, 스크롤을 멈추는 것을 말한다.
  overscroll-behavior-x: contain;
  // 스크롤을 멈추는 것을 말한다.
  scroll-snap-type: none;

  ${hideScrollbar}
`;

export const ListContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;
