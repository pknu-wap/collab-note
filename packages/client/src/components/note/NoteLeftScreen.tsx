import styled from '@emotion/styled';
import { Button } from '../common';
import useDisclosure from '~/hooks/useDisclosure';

const NoteLeftScreen = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Container isOpen={isOpen}>
      <Button shadow color="success" size="sm" onClick={onToggle}>
        -
      </Button>
    </Container>
  );
};

const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: gray;
  z-index: 999;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  ${({ isOpen }) =>
    isOpen
      ? `
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
  `
      : `
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  `}
`;

export default NoteLeftScreen;
