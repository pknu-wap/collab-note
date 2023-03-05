import { Route, Routes } from 'react-router-dom';
import HomePage from '~/pages/HomePage/HomePage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
