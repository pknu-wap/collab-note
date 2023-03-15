import { Route, Routes } from 'react-router-dom';
import BaseLayout from '~/components/layouts/BaseLayout';
import CRDTPAGE from '~/pages/CRDTPage/CRDTPAGE';
import HomePage from '~/pages/HomePage/HomePage';
import NotePage from '~/pages/NotePage/NotePage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/note/:noteId" element={<NotePage />} />
        <Route path="/crdt" element={<CRDTPAGE />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default PageRoutes;
