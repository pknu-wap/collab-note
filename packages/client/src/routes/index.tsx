import { Route, Routes } from 'react-router-dom';
import Main from '~/pages/Main/Main';
import MyPage from '~/pages/MyPage/MyPage';
import Note from '~/pages/Note/Note';
import NotFound from '~/pages/NotFound/NotFound';
import Setting from '~/pages/Setting/Setting';

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/note/:noteId" element={<Note />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
