import { useEffect, useRef, useState } from 'react';
import lobbySocket from '~/sockets/lobbySocket';
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import ChatInput from '~/components/home/ChatInput';
import Message from '~/components/home/Message';

const HomePage = () => {
  const [messages, setMessages] = useState<
    { text: string; isMyMessage: boolean; timeStamp: string }[]
  >([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lobbySocket.initLobbySocket();
    lobbySocket.receiveMessage({
      done: (text: string, isMyMessage: boolean, timeStamp: string) => {
        setMessages((prev) => [...prev, { text, isMyMessage, timeStamp }]);
        if (isMyMessage) {
          scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
        }
      },
    });
    return () => {
      lobbySocket.leaveLobby();
    };
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <>
      <Background>
        <div className="color" />
        <div className="color" />
        <div className="color" />
      </Background>
      <Layout>
        <Container>
          <ChatContainer ref={scrollRef}>
            <ChatList>
              {messages.map(({ isMyMessage, text, timeStamp }, idx) => {
                return (
                  <Message
                    key={idx}
                    isMyMessage={isMyMessage}
                    text={text}
                    timeStamp={timeStamp}
                  />
                );
              })}
            </ChatList>
          </ChatContainer>
          <ChatInput />
        </Container>
      </Layout>
    </>
  );
};

const Layout = styled.div`
  position: fixed;
  // dvh: mobile vh 대응
  height: 100dvh;
  width: 100%;
  z-index: 2;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const Background = styled.div`
  position: fixed;
  // dvh: mobile vh 대응
  height: 100dvh;
  width: 100%;
  z-index: 1;

  background: linear-gradient(to bottom, #ff4f8b, #dff1ff);
  overflow: hidden;

  .color {
    position: absolute;
    filter: blur(150px);
  }
  .color:nth-of-type(1) {
    top: 5%;
    background: #ff359b;
    width: 30%;
    height: 30%;
    z-index: 1;
  }
  .color:nth-of-type(2) {
    position: fixed;

    bottom: 0;
    left: 10%;
    background: #fffd87;
    width: 50%;
    height: 40%;
    z-index: 1;
  }
  .color:nth-of-type(3) {
    position: fixed;

    bottom: 0;
    right: 0;
    background: #00d2ff;
    width: 30%;
    height: 20%;
    z-index: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  gap: 10px;
  ${mediaQuery.tablet} {
    width: 768px;
  }
  z-index: 5;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding: 20px;
  z-index: 5;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 5;
`;

export default HomePage;
