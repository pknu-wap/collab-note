import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
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

const CRDTPage = () => {
  const clientId = useRef<number>(Math.floor(Math.random() * 1000) + 1);
  const crdtRef = useRef<CRDT>(new CRDT(clientId.current, new LinkedList()));
  const blockRef = useRef<HTMLParagraphElement>(null);
  const [offset, setOffset] = useState<number>(-1);

  const updateCaretPosition = useCallback(
    (updateOffset: number) => {
      if (!blockRef.current) return;

      const range = document.createRange();
      const sel = window.getSelection();

      range.setStart(blockRef.current.childNodes[0], offset + updateOffset);
      range.collapse(true);

      sel?.removeAllRanges();
      sel?.addRange(range);

      blockRef.current.focus();

      setOffset(offset + updateOffset);
    },
    [offset],
  );

  const handleClick = () => {
    if (!blockRef.current) return;

    const selection = window.getSelection();

    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);

    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(blockRef.current as HTMLParagraphElement);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const maxOffset = preCaretRange.toString().length;

    const nextOffset = range.startOffset + offset;

    setOffset(Math.min(maxOffset, Math.max(0, nextOffset)));
  };

  const handleKeydown = (e: React.FormEvent<HTMLParagraphElement>) => {
    const event = e.nativeEvent as KeyboardEvent;
    switch (event.key) {
      case 'ArrowLeft':
        if (offset < 0) return;
        setOffset(offset - 1);
        break;
      case 'ArrowRight':
        if (offset > crdtRef.current.read().length - 2) return;
        setOffset(offset + 1);
        break;
    }
  };

  const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
    const event = e.nativeEvent as InputEvent;
    const value = event.data as string;

    if (event.isComposing) return;

    switch (event.inputType) {
      case 'insertText': {
        setOffset(offset + 1);
        const remoteInsertion = crdtRef.current.localInsert(offset, value);
        crdtSocket.socket?.emit(SOCKET_EVENT.REMOTE_INSERT, {
          operation: remoteInsertion,
        });

        break;
      }
      case 'deleteContentBackward': {
        setOffset(offset - 1);
        const remoteDeletion = crdtRef.current.localDelete(offset);

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
      },
    );

    crdtSocket.socket?.on(
      SOCKET_EVENT.LOCAL_INSERT,
      ({ operation }: { operation: { node: Node } }) => {
        const prevIndex = crdtRef.current.remoteInsert(operation);

        if (!blockRef.current) return;

        blockRef.current.innerText = crdtRef.current.read();
        if (prevIndex == null) return;
        if (prevIndex < offset) updateCaretPosition(1);
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
        if (targetIndex == null) return;
        if (targetIndex <= offset) updateCaretPosition(-1);
      },
    );

    return () => {
      [SOCKET_EVENT.LOCAL_INSERT, SOCKET_EVENT.LOCAL_DELETE].forEach(
        (event) => {
          crdtSocket.socket?.off(event);
        },
      );
    };
  }, [offset, updateCaretPosition]);

  return (
    <BaseLayout>
      <Container>
        <div>CRDT TEST PAGE</div>
        <div>offset: {offset}</div>
        <Block
          contentEditable
          ref={blockRef}
          onClick={handleClick}
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

export default CRDTPage;
