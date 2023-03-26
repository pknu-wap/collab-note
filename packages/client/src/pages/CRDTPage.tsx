import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import { SOCKET_EVENT } from '~/constants';
import CRDT from '~/lib/crdt/crdt';
import LinkedList from '~/lib/crdt/linkedList';
import { mediaQuery } from '~/lib/styles';
import crdtSocket from '~/sockets/crdtSocket';
const CRDTPage = () => {
  const [text, setText] = useState('');
  const crdt = new CRDT(-1, new LinkedList());
  const blockRef = useRef<HTMLParagraphElement>(null);

  // local insert

  const handleLocalInsert = () => {
    return;
  };

  const handleLocalDelete = () => {
    return;
  };

  const handleLocalUpdate = () => {
    return;
  };

  // remote insert

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
      [
        SOCKET_EVENT.REMOTE_INSERT,
        SOCKET_EVENT.REMOTE_DELETE,
        SOCKET_EVENT.REMOTE_UPDATE,
      ].forEach((event) => {
        crdtSocket.socket?.off(event);
      });
    };
  }, []);

  return (
    <BaseLayout>
      <Container>
        <div>CRDT TEST PAGE</div>
        {/* contentEditable은 다른 tag를 input, textarea로 만들어 준다. */}
        <Block contentEditable ref={blockRef} />
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
  border: solid 1px gray;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export default CRDTPage;
