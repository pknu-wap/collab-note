import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import { SOCKET_EVENT } from '~/constants';
import CRDT from '~/lib/crdt/crdt';
import Identifier from '~/lib/crdt/identifier';
import LinkedList from '~/lib/crdt/linkedList';
import Node from '~/lib/crdt/node';
import { mediaQuery } from '~/lib/styles';
import crdtSocket from '~/sockets/crdtSocket';
const CRDTPage = () => {
  const crdtRef = useRef<CRDT>(
    new CRDT(Math.floor(Math.random() * 100) + 1, new LinkedList()),
  );
  const blockRef = useRef<HTMLParagraphElement>(null);
  const [offset, setOffset] = useState<number>(-1);

  // TODO: 일단 간단하게 구현해보기
  const handleKeydown = (e: React.FormEvent<HTMLParagraphElement>) => {
    const event = e.nativeEvent as KeyboardEvent;
    switch (event.key) {
      case 'ArrowLeft':
        // 0보다 작아지면 안됨
        if (offset < 0) return;
        setOffset(offset - 1);
        break;
      case 'ArrowRight':
        setOffset(offset + 1);
        break;
    }
  };

  const updateCaretPosition = (updateOffset: number) => {
    if (!blockRef.current) return;

    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(blockRef.current.childNodes[0], updateOffset);
    range.collapse(true);

    selection?.removeAllRanges();
    selection?.addRange(range);

    blockRef.current.focus();

    setOffset(updateOffset);
  };

  // [LOCAL]

  const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
    const event = e.nativeEvent as InputEvent;
    const value = event.data as string; // null 제거

    // 한글 입력 중일 때는 무시
    if (event.isComposing) return console.log('한글 입력 중');

    // event.inputType에는 insertText, deleteContentBackward, insertFromPaste, formatBold 등이 있다.
    switch (event.inputType) {
      case 'insertText': {
        console.log('[insert]');

        const index = offset;
        setOffset(offset + 1);
        const remoteInsertion = crdtRef.current.localInsert(index, value);
        crdtSocket.socket?.emit(SOCKET_EVENT.REMOTE_INSERT, {
          // id는 block id
          id: -1,
          operation: remoteInsertion,
        });

        break;
      }
      case 'deleteContentBackward': {
        console.log('[delete]');
        const index = offset;
        setOffset(offset - 1);
        const remoteDeletion = crdtRef.current.localDelete(index);
        console.log(remoteDeletion);

        crdtSocket.socket?.emit(SOCKET_EVENT.REMOTE_DELETE, {
          // id는 block id
          id: -1,
          operation: remoteDeletion,
        });

        break;
      }
    }
  };

  // [REMOTE]

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
        // id는 block id

        const prevIndex = crdtRef.current.remoteInsert(operation);

        if (!blockRef.current)
          return console.log('blockRef.current가 없습니다.');

        blockRef.current.innerText = crdtRef.current.read();
        if (prevIndex == null) return;
        updateCaretPosition(Number(prevIndex < offset));
      },
    );

    crdtSocket.socket?.on(
      SOCKET_EVENT.LOCAL_DELETE,
      ({
        id,
        operation,
      }: {
        id: string;
        operation: {
          targetId: Identifier | null;
          clock: number;
        };
      }) => {
        // id는 block id

        const targetIndex = crdtRef.current.remoteDelete(operation);
        if (!blockRef.current)
          return console.log('blockRef.current가 없습니다.');

        blockRef.current.innerText = crdtRef.current.read();
        if (targetIndex == null) return;
        updateCaretPosition(-Number(targetIndex <= offset));
      },
    );

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
        <div>offset: {offset}</div>
        {/* contentEditable은 다른 tag를 input, textarea로 만들어 준다. */}
        <Block
          contentEditable
          ref={blockRef}
          onInput={handleInput}
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
