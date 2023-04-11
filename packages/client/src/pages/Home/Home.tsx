import styled from '@emotion/styled';
import BaseLayout from '~/components/layouts/BaseLayout';
import MyNoteList from '~/components/note/MyNoteList';
import PublicNoteList from '~/components/note/PublicNoteList';
import SearchBar from '~/components/note/SearchBar';

const Home = () => {
  return (
    <BaseLayout>
      <Container>
        <SearchBar />
        <MyNoteList />
        <PublicNoteList />
      </Container>
    </BaseLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export default Home;
