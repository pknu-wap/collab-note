import styled from '@emotion/styled';

const SearchBar = () => {
  return <Container>Search Bar</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 3rem;
`;

export default SearchBar;
