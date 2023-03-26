import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import { SOCKET_EVENT } from '~/constants';
import CRDT from '~/lib/crdt/crdt';
import { mediaQuery } from '~/lib/styles';
import crdtSocket from '~/sockets/crdtSocket';
const CRDTPage = () => {
  const [text, setText] = useState('');
  const crdt = new CRDT();
  const blockRef = useRef<HTMLParagraphElement>(null);

  const handleLocalInsert = () => {
    return;
  };

  const handleLocalDelete = () => {
    return;
  };

  const handleLocalUpdate = () => {
    return;
  };

  useEffect(() => {
    crdtSocket.socket?.on(SOCKET_EVENT.REMOTE_INSERT, () => {
      return;
    });

    crdtSocket.socket?.on(SOCKET_EVENT.REMOTE_DELETE, () => {
      return;
    });

    crdtSocket.socket?.on(SOCKET_EVENT.REMOTE_UPDATE, () => {
      return;
    });

    return () => {
      crdtSocket.socket?.off(SOCKET_EVENT.REMOTE_INSERT);
      crdtSocket.socket?.off(SOCKET_EVENT.REMOTE_DELETE);
      crdtSocket.socket?.off(SOCKET_EVENT.REMOTE_UPDATE);
    };
  }, []);

  return (
    <BaseLayout>
      <Container>
        <div>CRDT TEST PAGE</div>
        {/* contentEditable은 다른 tag를 input, textarea로 만들어 준다. */}
        <Block contentEditable ref={blockRef}>
          CRDT
        </Block>
      </Container>
    </BaseLayout>
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
