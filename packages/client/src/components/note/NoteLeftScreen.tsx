import styled from '@emotion/styled';

const NoteLeftScreen = () => {
  return <Container></Container>;
};

const Container = styled.div`
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
`;

export default NoteLeftScreen;
