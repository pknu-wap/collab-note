import styled from '@emotion/styled';

const MyPublicList = () => {
  return (
    <Container>
      <Title>My Public List</Title>
      <List></List>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 320px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 0.5rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export default MyPublicList;
