import { useEffect, useRef, useState } from 'react';
import noteSocket from '~/sockets/noteSocket';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

const NotePage = () => {
  const { noteId } = useParams() as { noteId: string };

  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    noteSocket.initNoteSocket();
    noteSocket.joinNote(noteId);
    noteSocket.receiveMessage({
      done: (message) => setMessages((prev) => [...prev, message]),
    });
    return () => {
      noteSocket.leaveNote(noteId);
    };
  }, [noteId]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo(0, chatListRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    noteSocket.sendMessage({ noteId, message: messageInput });
    setMessageInput('');
  };

  return (
    <Container>
      <ContentsWrapper>
        <ChatContainer ref={chatListRef}>
          {messages.map((message) => {
            return <div key={crypto.randomUUID()}>{message}</div>;
          })}
        </ChatContainer>
      </ContentsWrapper>
      <ChatForm onSubmit={handleSubmitMessage}>
        <ChatInput
          placeholder="Write Message..."
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
        />
        <button type="submit">Send</button>
      </ChatForm>
    </Container>
  );
};

const ChatForm = styled.form`
  margin-top: 20px;
  width: 600px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 1rem;
`;
const ChatInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 0 1rem;
  font-size: 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.8);
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  width: 600px;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
`;

const ContentsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  height: 400px;
`;

export default NotePage;
