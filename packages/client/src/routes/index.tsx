import { Route, Routes } from 'react-router-dom';
import HomePage from '~/pages/HomePage/HomePage';
import NotePage from '~/pages/NotePage/NotePage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/note" element={<NotePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
