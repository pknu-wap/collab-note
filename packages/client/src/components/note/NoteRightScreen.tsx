import styled from '@emotion/styled';

const NoteRightScreen = () => {
  return <Container></Container>;
};

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: gray;
  z-index: 999;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export default NoteRightScreen;
