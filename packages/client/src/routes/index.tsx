import { Route, Routes } from 'react-router-dom';
import CRDTPage from '~/pages/CRDTPage/CRDTPage';
import HomePage from '~/pages/HomePage/HomePage';
import NotePage from '~/pages/NotePage/NotePage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/note/:noteId" element={<NotePage />} />
      <Route path="/crdt" element={<CRDTPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
