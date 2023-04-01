import { useEffect, useRef } from 'react';
import { SOCKET_EVENT } from '@collab-note/common';
import noteSocket from '~/sockets/noteSocket';
import useConnectedUsersStore from '~/stores/useConnectedUsersStore';
import useMyMediaStreamStore from '~/stores/useMyMediaStreamStore';
import useUserStreamsStore from '~/stores/useUserStreamsStore';
const usePeerConnection = () => {
  const pcsRef = useRef<{ [sid: string]: RTCPeerConnection }>({});
  const { userStreams, setUserStreams } = useUserStreamsStore();
  const { connectedUsers, setConnectedUsers } = useConnectedUsersStore();
  const { isMyVideoOn, isMyAudioOn, myMediaStream } = useMyMediaStreamStore();

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
    const pc = new RTCPeerConnection(RTCConfig);

    pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (!event.candidate) return;
      noteSocket.socket?.emit(SOCKET_EVENT.SEND_ICE_CANDIDATE, {
        to: sid,
        candidate: event.candidate,
      });
    };

    pc.ontrack = (event: RTCTrackEvent) => {
      const stream = event.streams[0];
      setUserStreams({ sid, stream });
    };

    myMediaStream?.getTracks().forEach((track) => {
      pc.addTrack(track, myMediaStream);
    });

    return pc;
  };

  const onNewUser = async ({ sid }: { sid: string }) => {
    const pc = createPeerConnection(sid);
    if (!pc) return;

    setConnectedUsers([...connectedUsers, { sid }]);

    const offer = await pc.createOffer({
      offerToReceiveAudio: isMyAudioOn,
      offerToReceiveVideo: isMyVideoOn,
    });
    await pc.setLocalDescription(new RTCSessionDescription(offer));

    pcsRef.current[sid] = pc;

    noteSocket.socket?.emit(SOCKET_EVENT.SEND_OFFER, {
      to: sid,
      offer,
    });
  };

  const onReceivedOffer = async ({
    sid,
    offer,
  }: {
    sid: string;
    offer: RTCSessionDescriptionInit;
  }) => {
    const pc = createPeerConnection(sid);
    if (!pc) return;

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(new RTCSessionDescription(answer));

    pcsRef.current[sid] = pc;

    noteSocket.socket?.emit(SOCKET_EVENT.SEND_ANSWER, {
      to: sid,
      answer,
    });
  };

  const onReceivedAnswer = async ({
    sid,
    answer,
  }: {
    sid: string;
    answer: RTCSessionDescriptionInit;
  }) => {
    const pc = pcsRef.current?.[sid];
    if (!pc) return;

    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const onReceivedIceCandidate = async ({
    sid,
    candidate,
  }: {
    sid: string;
    candidate: RTCIceCandidateInit;
  }) => {
    const pc = pcsRef.current?.[sid];
    if (!pc) return;

    await pc.addIceCandidate(new RTCIceCandidate(candidate));
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
      [
        SOCKET_EVENT.NEW_USER,
        SOCKET_EVENT.RECEIVED_OFFER,
        SOCKET_EVENT.RECEIVED_ANSWER,
        SOCKET_EVENT.RECEIVED_ICE_CANDIDATE,
      ].forEach((event) => noteSocket.socket?.off(event));

      if (userStreams) {
        Object.keys(userStreams).forEach((sid) => {
          const pc = pcsRef.current?.[sid];
          if (!pc) return;
          pc.close();
          delete pcsRef.current[sid];
        });
      }
    };
  }, [userStreams, myMediaStream]);
};

export default usePeerConnection;
