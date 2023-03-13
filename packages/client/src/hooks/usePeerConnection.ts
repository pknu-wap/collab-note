import { useEffect, useRef } from 'react';
import { SOCKET_EVENT } from '~/constants';
import noteSocket from '~/sockets/noteSocket';
const usePeerConnection = () => {
  const peerConnectionsRef = useRef<{ [sid: string]: RTCPeerConnection }>({});

  const RTCConfig = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };

  const createPeerConnection = (sid: string) => {
    const peerConnection = new RTCPeerConnection(RTCConfig);

    peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) return;
      noteSocket.socket?.emit(SOCKET_EVENT.SEND_ICE_CANDIDATE, {
        to: sid,
        candidate: event.candidate,
      });
    };

    peerConnection.ontrack = (event: RTCTrackEvent) => {
      const stream = event.streams[0];
      return;
    };

    return peerConnection;
  };

  const createOffer = () => {
    return;
  };

  const createAnswer = () => {
    return;
  };

  const onNewUser = ({ sid }: { sid: string }) => {
    const pc = createPeerConnection(sid);
  };

  const onReceivedOffer = () => {
    return;
  };

  const onReceivedAnswer = () => {
    return;
  };

  const onReceivedIceCandidate = () => {
    return;
  };

  useEffect(() => {
    noteSocket.socket?.on(SOCKET_EVENT.NEW_USER, onNewUser);
    noteSocket.socket?.on(SOCKET_EVENT.RECEIVED_OFFER, onReceivedOffer);
    noteSocket.socket?.on(SOCKET_EVENT.RECEIVED_ANSWER, onReceivedAnswer);
    noteSocket.socket?.on(
      SOCKET_EVENT.RECEIVED_ICE_CANDIDATE,
      onReceivedIceCandidate,
    );
    return () => {
      noteSocket.socket?.off(SOCKET_EVENT.NEW_USER);
      noteSocket.socket?.off(SOCKET_EVENT.RECEIVED_OFFER);
      noteSocket.socket?.off(SOCKET_EVENT.RECEIVED_ANSWER);
      noteSocket.socket?.off(SOCKET_EVENT.RECEIVED_ICE_CANDIDATE);
    };
  }, []);
};

export default usePeerConnection;
