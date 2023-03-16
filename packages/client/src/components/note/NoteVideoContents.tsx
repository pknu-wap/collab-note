import styled from '@emotion/styled';
import { useEffect } from 'react';
import useConnectedUsersStore from '~/stores/useConnectedUsersStore';
import useMyMediaStreamStore from '~/stores/useMyMediaStreamStore';
import useUserStreamsStore from '~/stores/useUserStreamsStore';
import VideoScreen from './VideoScreen';

interface Props {
  noteId: string;
}

const NoteVideoContents = ({ noteId }: Props) => {
  const { isMyVideoOn, isMyAudioOn, myMediaStream, setMyMediaStream } =
    useMyMediaStreamStore();
  const { connectedUsers } = useConnectedUsersStore();
  const { userStreams } = useUserStreamsStore();

  useEffect(() => {
    const setMediaTracks = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isMyVideoOn,
        audio: isMyAudioOn,
      });

      setMyMediaStream(stream);
    };

    setMediaTracks();
  }, []);

  const findUserStream = (sid: string): MediaStream | null => {
    const user = connectedUsers.find((user) => user.sid === sid);
    if (!user) return null;
    return userStreams[user.sid];
  };

  return (
    <Container>
      <VideoScreen connectedUser={{ sid: '' }} stream={myMediaStream} />
      {connectedUsers[0] ? (
        <VideoScreen
          connectedUser={connectedUsers[0]}
          stream={findUserStream(connectedUsers[0].sid)}
        />
      ) : (
        <BlackScreen />
      )}

      {connectedUsers[1] ? (
        <VideoScreen
          connectedUser={connectedUsers[1]}
          stream={findUserStream(connectedUsers[1].sid)}
        />
      ) : (
        <BlackScreen />
      )}

      {connectedUsers[2] ? (
        <VideoScreen
          connectedUser={connectedUsers[2]}
          stream={findUserStream(connectedUsers[2].sid)}
        />
      ) : (
        <BlackScreen />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  margin-top: 1rem;
`;

const BlackScreen = styled.div`
  width: 200px;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default NoteVideoContents;
