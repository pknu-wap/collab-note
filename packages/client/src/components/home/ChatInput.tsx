import { useState } from 'react';
import styled from '@emotion/styled';
import lobbySocket from '~/sockets/lobbySocket';
import { glassmorphism } from '~/lib/styles';

const ChatInput = () => {
  const [messageInput, setMessageInput] = useState<string>('');

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageInput) return;
    lobbySocket.sendMessage({ text: messageInput });
    setMessageInput('');
  };

  const handleChangeMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmitMessage}>
      <MessageInput
        placeholder="Write Message..."
        onChange={handleChangeMessageInput}
        value={messageInput}
      />
    </Form>
  );
};

export default ChatInput;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem 1rem 1rem;
  z-index: 5;
`;

const MessageInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  height: 50px;
  z-index: 5;

  ${glassmorphism}
`;
