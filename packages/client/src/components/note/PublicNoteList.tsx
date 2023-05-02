import styled from '@emotion/styled';

const MyPublicList = () => {
  return (
    <Container>
      <Title>My Public List</Title>
      <List>
        {Array.from({ length: 30 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              width: '100%',
              height: '300px',
              padding: '1rem',
              backgroundClip: 'content-box',
              backgroundColor: `${idx % 2 == 0 ? '#a9fbff' : '#abffba'}`,
            }}
          />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 0.5rem;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-left: auto;
  margin-right: auto;

  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export default MyPublicList;
