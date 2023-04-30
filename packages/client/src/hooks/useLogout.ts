import { AuthAPI } from '~/lib/api';

const useLogout = () => {
  const logout = async () => {
    try {
      await AuthAPI.logout();
    } catch (error) {
      console.error(error);
    }
    window.location.href = '/';
  };

  return logout;
};

export default useLogout;
