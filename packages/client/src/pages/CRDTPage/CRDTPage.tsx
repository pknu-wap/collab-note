import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import CRDT from '~/lib/crdt/crdt';
import { mediaQuery } from '~/lib/styles';

const CRDTPage = () => {
  const [text, setText] = useState('');
  const crdt = new CRDT();

  useEffect(() => {
    return;
  }, []);

  return (
    <Container>
      <div>CRDT TEST PAGE</div>
      {/* contentEditable은 다른 tag를 input, textarea로 만들어 준다. */}
      <Block contentEditable>CRDT</Block>
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
  line-height: 1.5;
  outline: none;
`;

export default CRDTPage;
