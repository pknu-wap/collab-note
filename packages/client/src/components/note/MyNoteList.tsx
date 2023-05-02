import styled from '@emotion/styled';
import { Carousel } from '../common';

const MyNoteList = () => {
  // 랜덤 밝은 색 컬러 생성기

  return (
    <Container>
      <Title>My Note List</Title>
      <Carousel>
        {Array.from({ length: 30 }).map((_, idx) => (
          <div
            key={idx}
            style={{
              width: '350px',
              height: '300px',
              paddingRight: '1rem',
              backgroundClip: 'content-box',
              backgroundColor: `${idx % 2 == 0 ? '#70bbf5' : '#edf9b2'}`,
            }}
          />
        ))}
      </Carousel>
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

export default MyNoteList;
