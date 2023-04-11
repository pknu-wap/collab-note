import styled from '@emotion/styled';

const MyNoteList = () => {
  return (
    <Container>
      <Title>My Note List</Title>
      <List></List>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 180px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 0.5rem;
`;

const List = styled.div`
  display: flex;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  gap: 1rem;
  overflow-y: scroll;
`;

export default MyNoteList;
