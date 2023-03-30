import BaseLayout from '~/components/layouts/BaseLayout';
import { add } from '@collab-note/shared';
const HomePage = () => {
  return (
    <BaseLayout>
      <div>Home</div>
      <div>{add(3, 4)}</div>
    </BaseLayout>
  );
};

export default HomePage;
