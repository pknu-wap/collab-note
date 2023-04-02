import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import {
  SOCKET_EVENT,
  CRDT,
  Identifier,
  LinkedList,
  Node,
} from '@collab-note/common';
import { mediaQuery } from '~/lib/styles';
import crdtSocket from '~/sockets/crdtSocket';
import useOffset from '~/hooks/useOffset';

const HomePage = () => {
  const clientId = useRef<number>(Math.floor(Math.random() * 1000) + 1);

  const crdtRef = useRef<CRDT>(new CRDT(clientId.current, new LinkedList()));
  const blockRef = useRef<HTMLParagraphElement>(null);

  const { clearOffset, offsetHandlers, offsetRef, onArrowKeyDown, setOffset } =
    useOffset(blockRef);

  const updateCaretPosition = (updateOffset = 0) => {
    if (offsetRef.current === null) return;

    const selection = window.getSelection();

    if (!selection) return;

    selection.removeAllRanges();

    const range = new Range();

    if (!blockRef.current) return;

    // 우선 블럭의 첫번째 text node로 고정, text node가 없는 경우 clearOffset()
    if (!blockRef.current.firstChild) {
      clearOffset();
      return;
    }

    // range start와 range end가 같은 경우만 가정
    range.setStart(
      blockRef.current.firstChild,
      offsetRef.current + updateOffset,
    );
    range.collapse();
    selection.addRange(range);

    // 변경된 offset 반영
    setOffset();
  };

  const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
    setOffset();

    const event = e.nativeEvent as InputEvent;
    const value = event.data as string;

    if (event.isComposing) return;
    if (offsetRef.current === null) return;

    switch (event.inputType) {
      case 'insertText': {
        const remoteInsertion = crdtRef.current.localInsert(
          offsetRef.current,
          value,
        );
        crdtSocket.socket?.emit(SOCKET_EVENT.REMOTE_INSERT, {
          operation: remoteInsertion,
        });

        break;
      }
      case 'deleteContentBackward': {
        const remoteDeletion = crdtRef.current.localDelete(offsetRef.current);

        crdtSocket.socket?.emit(SOCKET_EVENT.REMOTE_DELETE, {
          operation: remoteDeletion,
        });

        break;
      }
    }
  };

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

        updateCaretPosition();
      },
    );

    crdtSocket.socket?.on(
      SOCKET_EVENT.LOCAL_INSERT,
      ({ operation }: { operation: { node: Node } }) => {
        const prevIndex = crdtRef.current.remoteInsert(operation);

        if (!blockRef.current) return;

        blockRef.current.innerText = crdtRef.current.read();

        if (prevIndex == null || offsetRef.current === null) return;
        updateCaretPosition(Number(prevIndex < offsetRef.current));
      },
    );

    crdtSocket.socket?.on(
      SOCKET_EVENT.LOCAL_DELETE,
      ({
        operation,
      }: {
        operation: {
          targetId: Identifier | null;
          clock: number;
        };
      }) => {
        const targetIndex = crdtRef.current.remoteDelete(operation);
        if (!blockRef.current) return;

        blockRef.current.innerText = crdtRef.current.read();

        if (targetIndex === null || offsetRef.current === null) return;
        updateCaretPosition(-Number(targetIndex <= offsetRef.current));
      },
    );

    return () => {
      [SOCKET_EVENT.LOCAL_INSERT, SOCKET_EVENT.LOCAL_DELETE].forEach(
        (event) => {
          crdtSocket.socket?.off(event);
        },
      );
    };
  }, []);

  return (
    <BaseLayout>
      <Container>
        <Block
          contentEditable
          ref={blockRef}
          onInput={handleInput}
          onKeyDown={onArrowKeyDown}
          {...offsetHandlers}
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
    width: 600px;
  }
  gap: 1rem;
`;

const Block = styled.p`
  width: 100%;
  margin-top: 1rem;
  line-height: 1.5;
  outline: none;
  border: solid 1px gray;
  padding: 1rem;
  border-radius: 0.5rem;
`;

export default HomePage;
