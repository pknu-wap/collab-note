import styled from '@emotion/styled';
import { zIndexes } from '~/lib/styles';
import { PAGE_LIST } from '~/constants';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Container>
      <div>
        <Link to={PAGE_LIST.HOME}>HOME</Link>
      </div>
      <div>
        <Link to={`${PAGE_LIST.NOTE}/1`}>NOTE 1</Link>
      </div>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: ${zIndexes.Header};
  height: 60px;
  padding: 0px 16px;
  background: #000;
  div {
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
