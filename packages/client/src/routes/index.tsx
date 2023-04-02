import { Route, Routes } from 'react-router-dom';
import HomePage from '~/pages/HomePage';
import NotePage from '~/pages/NotePage';
import NotFoundPage from '~/pages/NotFoundPage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/note/:noteId" element={<NotePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
