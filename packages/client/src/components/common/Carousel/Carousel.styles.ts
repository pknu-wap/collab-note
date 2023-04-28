import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { hideScrollbar } from '~/lib/styles';

export const Container = styled.div`
  position: relative;
  width: 100%;

  &:hover {
    button {
      position: absolute;
      top: 50%;
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

export const SideButton = styled.button<{ visible: boolean }>`
  position: absolute;
  top: 50%;

  cursor: pointer;
  user-select: none;
  pointer-events: all;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;
  border: none;
  font-size: 1rem;

  padding: 1rem;

  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 12px 48px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(30px);
  width: 54px;
  height: 64px;
  filter: blur(1rem);

  transition: all 0.35s ease;
  opacity: 0;
  z-index: 5;

  ${({ visible }) =>
    visible &&
    css`
      visibility: hidden;
      opacity: 0;
      filter: blur(30px);
    `};

  svg {
    width: 32px;
    height: 24px;
    color: #fff;
  }
`;

export const HorizontalScrollPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  overflow-x: scroll;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  scroll-snap-type: none;

  ${hideScrollbar}
`;

export const ListContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;
