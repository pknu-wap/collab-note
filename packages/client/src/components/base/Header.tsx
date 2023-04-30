import styled from '@emotion/styled';
import { zIndexes } from '~/lib/styles';
import { API_URL, PAGE_LIST } from '~/constants';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '~/hooks/useUser';
import { Button } from '~/components/common';
import HeaderDropdown from '~/components/base/HeaderMenu/HeaderMenu';
import useLogout from '~/hooks/useLogout';
import Logo from '~/assets/images/Logo.png';

const Header = () => {
  const user = useUser();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleGithubLogin = () => {
    window.location.href = `${API_URL.AUTH.GITHUB_OAUTH_LOGIN}`;
  };

  const menuItemList = [
    {
      text: 'Home',
      onClick: () => navigate(`${PAGE_LIST.HOME}`),
      red: false,
    },
    {
      text: 'Main',
      onClick: () => navigate(`${PAGE_LIST.MAIN}`),
      red: false,
    },
    {
      text: 'My Page',
      onClick: () => navigate(`${PAGE_LIST.MY_PAGE}`),
      red: false,
    },
    {
      text: 'Setting',
      onClick: () => navigate(`${PAGE_LIST.SETTING}`),
      red: false,
    },
    {
      text: 'Logout',
      onClick: logout,
      red: true,
    },
  ];

  return (
    <Container>
      <LogoLink to="/">
        <img src={Logo} />
        Collab Notes
      </LogoLink>
      <HeaderItems>
        {user ? (
          <>
            <Button
              shadow
              size="sm"
              onClick={() => navigate(`${PAGE_LIST.NOTE_CREATE}`)}
            >
              Create Note
            </Button>
            <HeaderDropdown menuItemList={menuItemList} />
          </>
        ) : (
          <Button shadow color="primary" size="sm" onClick={handleGithubLogin}>
            Login
          </Button>
        )}
      </HeaderItems>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: ${zIndexes.Header};
  height: 90px;
  width: 100%;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  height: 4rem;
  padding: 0px 16px;

  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: saturate(180%) blur(10px);
  box-shadow: 0px 5px 20px -5px rgba(2, 1, 1, 0.1);
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'PyeongChangPeace-Bold', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 10px;
  color: #634329;
  padding: 0 16px;

  img {
    margin-right: 8px;
    width: 24px;
    height: 24px;
  }
`;

const HeaderItems = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
`;

export default Header;
