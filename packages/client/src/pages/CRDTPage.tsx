import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import { SOCKET_EVENT } from '~/constants';
import CRDT from '~/lib/crdt/crdt';
import LinkedList from '~/lib/crdt/linkedList';
import Node from '~/lib/crdt/node';
import { mediaQuery } from '~/lib/styles';
import crdtSocket from '~/sockets/crdtSocket';
const CRDTPage = () => {
  const crdtRef = useRef<CRDT>(
    new CRDT(Math.floor(Math.random() * 100) + 1, new LinkedList()),
  );
  const blockRef = useRef<HTMLParagraphElement>(null);
  const offsetRef = useRef<number>(-1); // index -1부터 해야하는 듯???

  // TODO: 일단 간단하게 구현해보기
  const handleKeydown = (e: React.FormEvent<HTMLParagraphElement>) => {
    const event = e.nativeEvent as KeyboardEvent;
    switch (event.key) {
      case 'ArrowLeft':
        offsetRef.current--;
        break;
      case 'ArrowRight':
        offsetRef.current++;
        break;
    }
  };

  //TODO: cursor 위치는 나중에 신경쓰기

  // local insert

  const handleLocalInsert = (e: React.FormEvent<HTMLParagraphElement>) => {
    console.log('local insert');

    const event = e.nativeEvent as InputEvent;
    const index = offsetRef.current++;
    const value = event.data;

    if (!value) return;

    const remoteInsertion = crdtRef.current.localInsert(index, value);
    console.log('여기여기', remoteInsertion);
    crdtSocket.socket?.emit(SOCKET_EVENT.REMOTE_INSERT, {
      // id는 block id
      id: -1,
      operation: remoteInsertion,
    });
  };

  const handleLocalDelete = () => {
    return;
  };

  const handleLocalUpdate = () => {
    return;
  };

  // remote insert

  useEffect(() => {
    crdtSocket.initCrdtSocket();

    crdtSocket.socket?.on(
      SOCKET_EVENT.CRDT_INIT,
      ({ data }: { data: LinkedList }) => {
        crdtRef.current = new CRDT(
          Math.floor(Math.random() * 100) + 1,
          new LinkedList(data),
        );

        if (!blockRef.current) return;

        blockRef.current.innerText = crdtRef.current.read();
      },
    );

    crdtSocket.socket?.on(
      SOCKET_EVENT.LOCAL_INSERT,
      ({ id, operation }: { id: number; operation: { node: Node } }) => {
        crdtRef.current.remoteInsert(operation);

        if (!blockRef.current) {
          console.log('blockRef.current가 없습니다.');
          return;
        }

        blockRef.current.innerText = crdtRef.current.read();
      },
    );

    crdtSocket.socket?.on(SOCKET_EVENT.LOCAL_DELETE, () => {
      return;
    });

    crdtSocket.socket?.on(SOCKET_EVENT.LOCAL_UPDATE, () => {
      return;
    });

    return () => {
      [
        SOCKET_EVENT.LOCAL_INSERT,
        SOCKET_EVENT.LOCAL_DELETE,
        SOCKET_EVENT.LOCAL_UPDATE,
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
        <Block
          contentEditable
          ref={blockRef}
          onInput={handleLocalInsert}
          onKeyDown={handleKeydown}
        />
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
