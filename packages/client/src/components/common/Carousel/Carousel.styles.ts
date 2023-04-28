import styled from '@emotion/styled';
import { hideScrollbar } from '~/lib/styles';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const SideButton = styled.button<{ visible: boolean }>`
  cursor: pointer;
  user-select: none;
  pointer-events: all;

  position: absolute;
  top: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;
  border: none;
  font-size: 1.5rem;

  padding: 1rem;

  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0px 12px 48px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(30px);
  filter: blur(1rem);

  transition: all 0.35s ease;
  opacity: 0;
  z-index: 5;
`;

export const ListContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const HorizontalScrollPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  overflow-x: scroll;
  scroll-behavior: smooth;

  ${hideScrollbar}
`;
