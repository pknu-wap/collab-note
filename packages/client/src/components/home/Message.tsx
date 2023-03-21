// components
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { formatTime } from '~/lib/formatDate';
import { glassmorphism } from '~/lib/styles/shared';

interface Props {
  text: string;
  isMyMessage: boolean;
  timeStamp: string;
}

const Message = ({ text, isMyMessage, timeStamp }: Props) => {
  return (
    <MessageWrapper isMyMessage={isMyMessage}>
      <AnimatePresence>
        <Container
          animate={{
            opacity: 1,
            scale: 1,
          }}
          initial={{
            opacity: 0.5,
            scale: 0.5,
          }}
          isMyMessage={isMyMessage}
        >
          <div>{text}</div>
          <TimeStamp>{formatTime(timeStamp)}</TimeStamp>
        </Container>
      </AnimatePresence>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  min-height: 40px;
  min-width: 33%;
  max-width: 66%;
  align-self: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
`;

const Container = styled(motion.div)<{ isMyMessage: boolean }>`
  width: 100%;
  word-wrap: break-word;
  padding: 15px 20px;
  font-size: 14px;

  ${glassmorphism}
  font-family: 'Nanum Gothic', sans-serif;
  line-height: 1.5;
`;

const TimeStamp = styled.div`
  font-size: 10px;
  color: #595959;
  margin-top: 5px;
  width: 100%;
  text-align: right;
  font-style: italic;
`;

export default Message;
