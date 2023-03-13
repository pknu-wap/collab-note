import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

interface Props {
  connectedUser: {
    sid?: string;
  };
  stream: MediaStream | null;
}

const VideoScreen = ({ connectedUser, stream }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <VideoScreenWrapper>
      <Container autoPlay playsInline ref={videoRef} />
      <UserInfo>{connectedUser.sid}</UserInfo>
    </VideoScreenWrapper>
  );
};

const VideoScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.video`
  width: 150px;
  height: 150px;
  background-color: #000;
`;

const UserInfo = styled.div`
  font-size: 1rem;
  background-color: #000;
  color: #fff;
  width: 100%;
  text-align: center;
`;

export default VideoScreen;
