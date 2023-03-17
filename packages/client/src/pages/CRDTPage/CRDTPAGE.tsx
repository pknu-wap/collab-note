import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { mediaQuery } from '~/lib/styles';

const CRDTPage = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    return;
  }, []);

  return (
    <Container>
      <div>CRDT TEST PAGE</div>
      <Block>CRDT</Block>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  margin-top: 2rem;
  background-color: rgba(0, 0, 0, 0.05);
  ${mediaQuery.mobile} {
    width: 768px;
  }
`;

const Block = styled.p`
  width: 100%;
  margin-top: 2rem;
`;

export default CRDTPage;
