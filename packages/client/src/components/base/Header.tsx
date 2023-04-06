import styled from '@emotion/styled';
import { zIndexes } from '~/lib/styles';
import { PAGE_LIST } from '~/constants';
import { Link } from 'react-router-dom';
import { Button } from '../common';

const Header = () => {
  return (
    <Container>
      <Button shadow color="error" size="sm">
        +
      </Button>
      <div>
        <Link to={PAGE_LIST.MAIN}>Main</Link>
        <Link to={PAGE_LIST.NOTE('1')}>Note 1</Link>
        <Link to={PAGE_LIST.MY_PAGE}>My Page</Link>
        <Link to={PAGE_LIST.SETTING}>Setting</Link>
      </div>
      <Button shadow color="error" size="sm">
        +
      </Button>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: ${zIndexes.Header};
  height: 60px;
  padding: 0px 16px;
  background: #000;
  div {
    display: flex;
    gap: 1rem;
    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  div + div {
    margin-left: 16px;
  }
`;

export default Header;
