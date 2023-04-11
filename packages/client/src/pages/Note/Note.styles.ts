import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
`;

export const ChatForm = styled.form`
  margin-top: 20px;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 1rem;
`;
export const ChatInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 0 1rem;
  font-size: 1rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.8);
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const ContentsWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 600px;
`;
