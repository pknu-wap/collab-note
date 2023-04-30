import { useGetMe } from './hooks/queries/user';
import PageRoutes from './routes';

const App = () => {
  useGetMe();

  return <PageRoutes />;
};

export default App;
