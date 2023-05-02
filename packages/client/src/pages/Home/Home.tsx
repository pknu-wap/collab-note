import BaseLayout from '~/components/layouts/BaseLayout';
import MyNoteList from '~/components/note/MyNoteList';
import PublicNoteList from '~/components/note/PublicNoteList';
import SearchBar from '~/components/note/SearchBar';
import * as S from './Home.styles';

const Home = () => {
  return (
    <BaseLayout>
      <S.Container>
        <SearchBar />
        <MyNoteList />
        <PublicNoteList />
      </S.Container>
    </BaseLayout>
  );
};

export default Home;
