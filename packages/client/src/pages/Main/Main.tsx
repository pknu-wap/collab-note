import { useEffect, useRef } from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import {
  SOCKET_EVENT,
  CRDT,
  LinkedList,
  type RemoteDeleteOperation,
  type RemoteInsertOperation,
} from '@collab-note/common';
import crdtSocket from '~/sockets/crdtSocket';
import useOffset from '~/hooks/useOffset';
import * as S from './Main.styles';
import NoteLeftScreen from '~/components/note/NoteLeftScreen';
import NoteRightScreen from '~/components/note/NoteRightScreen';

const Main = () => {
  const clientId = useRef<number>(Math.floor(Math.random() * 1000) + 1);

  const crdtRef = useRef<CRDT>(new CRDT(clientId.current, new LinkedList()));
  const blockRef = useRef<HTMLParagraphElement>(null);

  const { offsetHandlers, offsetRef, setOffset, clearOffset } =
    useOffset(blockRef);

  const updateCaretPosition = (updateOffset = 0) => {
    if (offsetRef.current === null) return;

    const selection = window.getSelection();

    if (!selection) return;

    selection.removeAllRanges();

    const range = new Range();

    if (!blockRef.current) return;

    if (!blockRef.current.firstChild) {
      clearOffset();
      return;
    }

    range.setStart(
      blockRef.current.firstChild,
      offsetRef.current + updateOffset,
    );
    range.collapse();
    selection.addRange(range);

    setOffset();
  };

  const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
    setOffset();

    const event = e.nativeEvent as InputEvent;
    const value = event.data as string;

    if (event.isComposing) return;
    if (offsetRef.current === null) return;

    console.log('event.value', value);

    switch (event.inputType) {
      case 'insertText': {
        const remoteInsertion = crdtRef.current.localInsert(
          offsetRef.current - 2,
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

  const onCompositionEnd: React.CompositionEventHandler = (e) => {
    if (!offsetRef.current) return;

    const event = e.nativeEvent as CompositionEvent;

    const letters = Array.from(event.data);
    const maxIndex = letters.length - 1;

    letters.forEach((letter, idx) => {
      const pos = offsetRef.current - 2 - (maxIndex - idx);
      const remoteInsertion = crdtRef.current.localInsert(pos, letter);

      crdtSocket.socket?.emit(SOCKET_EVENT.REMOTE_INSERT, {
        operation: remoteInsertion,
      });
    });
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
      ({ operation }: { operation: RemoteInsertOperation }) => {
        const prevIndex = crdtRef.current.remoteInsert(operation);
        console.log(prevIndex, operation.node);
        if (!blockRef.current) return;

        blockRef.current.innerText = crdtRef.current.read();

        if (prevIndex == null || offsetRef.current === null) return;
        updateCaretPosition(Number(prevIndex < offsetRef.current));
      },
    );

    crdtSocket.socket?.on(
      SOCKET_EVENT.LOCAL_DELETE,
      ({ operation }: { operation: RemoteDeleteOperation }) => {
        const targetIndex = crdtRef.current.remoteDelete(operation);
        console.log(targetIndex, operation.targetId, operation.clock);

        if (!blockRef.current) return;

        blockRef.current.innerText = crdtRef.current.read();

        if (targetIndex == null || offsetRef.current === null) return;
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
    <>
      <BaseLayout>
        <S.Container>
          <S.Block
            contentEditable
            ref={blockRef}
            onInput={handleInput}
            onCompositionEnd={onCompositionEnd}
            {...offsetHandlers}
          />
        </S.Container>
      </BaseLayout>
      <NoteLeftScreen />
      <NoteRightScreen />
    </>
  );
};

export default Main;
