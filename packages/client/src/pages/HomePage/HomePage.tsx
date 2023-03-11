import { useEffect, useRef, useState } from 'react';
import lobbySocket from '~/sockets/lobbySocket';
import styled from '@emotion/styled';

const HomePage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const chatListRef = useRef<HTMLDivElement>(null);

  const handleLoginGithub = () => {
    window.location.href = 'http://localhost:8080/auth/github';
  };

  useEffect(() => {
    lobbySocket.initLobbySocket();
    lobbySocket.joinLobby();
    lobbySocket.receiveMessage({
      done: (message) => setMessages((prev) => [...prev, message]),
    });
    return () => {
      lobbySocket.leaveLobby();
    };
  }, []);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo(0, chatListRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    lobbySocket.sendMessage({ message: messageInput });
    setMessageInput('');
  };

  return (
    <Container>
      <button onClick={handleLoginGithub}>깃허브 로그인</button>
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

export default HomePage;
