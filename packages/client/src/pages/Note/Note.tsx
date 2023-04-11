import { useEffect, useRef, useState } from 'react';
import noteSocket from '~/sockets/noteSocket';
import { useParams } from 'react-router-dom';
import NoteVideoContents from '~/components/note/NoteVideoContents';
import usePeerConnection from '~/hooks/usePeerConnection';
import useConnectedUsersStore from '~/stores/useConnectedUsersStore';
import useMyMediaStreamStore from '~/stores/useMyMediaStreamStore';
import useUserStreamsStore from '~/stores/useUserStreamsStore';
import BaseLayout from '~/components/layouts/BaseLayout';
import * as S from './Note.styles';

const Note = () => {
  const { noteId } = useParams() as { noteId: string };

  const { addConnectedUser, setConnectedUsers, deleteConnectedUser } =
    useConnectedUsersStore();
  const { myMediaStream, setMyMediaStream } = useMyMediaStreamStore();
  const { setUserStreamsEmpty, deleteUserStreams } = useUserStreamsStore();
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const chatListRef = useRef<HTMLDivElement>(null);

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    noteSocket.sendMessage({ noteId, message: messageInput });
    setMessageInput('');
  };

  const stopMediaStream = () => {
    if (!myMediaStream) return;
    console.log('stop media stream');
    myMediaStream.getTracks().forEach((track) => {
      track.stop();
    });
    setMyMediaStream(null);
  };

  usePeerConnection();

  useEffect(() => {
    noteSocket.initNoteSocket();
    noteSocket.joinNote(noteId);
    noteSocket.receiveMessage({
      done: (message) => setMessages((prev) => [...prev, message]),
    });
    noteSocket.receiveExistingNoteUsers({
      done: (users) => {
        console.log('existing note users', users);
        users.forEach((user) => {
          addConnectedUser({ sid: user.sid });
        });
      },
    });
    noteSocket.leftNote({
      done: (sid) => {
        deleteConnectedUser(sid);
        deleteUserStreams(sid);
        console.log('left note', sid);
      },
    });

    return () => {
      noteSocket.leaveNote(noteId);
      stopMediaStream();
      setConnectedUsers([]);
      setUserStreamsEmpty();
    };

    //TODO: myMediaStream 들어가면 에러남.
  }, [noteId]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo(0, chatListRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <BaseLayout>
      <S.Container>
        <S.ChatWrapper>
          <S.ContentsWrapper>
            <S.ChatContainer ref={chatListRef}>
              {messages.map((message) => {
                return <div key={crypto.randomUUID()}>{message}</div>;
              })}
            </S.ChatContainer>
          </S.ContentsWrapper>
          <S.ChatForm onSubmit={handleSubmitMessage}>
            <S.ChatInput
              placeholder="Write Message..."
              onChange={(e) => setMessageInput(e.target.value)}
              value={messageInput}
            />
            <button type="submit">Send</button>
          </S.ChatForm>
        </S.ChatWrapper>
        <NoteVideoContents noteId={noteId} />
      </S.Container>
    </BaseLayout>
  );
};

export default Note;
