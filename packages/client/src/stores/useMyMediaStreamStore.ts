import produce from 'immer';
import { create } from 'zustand';

type States = {
  myMediaStream: MediaStream | null;
  isMyVideoOn: boolean;
  isMyAudioOn: boolean;
};

type Actions = {
  setMyMediaStream: (myMediaStream: MediaStream) => void;
  setIsMyVideoOn: (isMyVideoOn: boolean) => void;
  setIsMyAudioOn: (isMyAudioOn: boolean) => void;
};

const useMyMediaStreamStore = create<States & Actions>((set) => ({
  myMediaStream: null,
  isMyVideoOn: true,
  isMyAudioOn: false,
  setMyMediaStream: (myMediaStream) =>
    set(
      produce((draft: States) => {
        draft.myMediaStream = myMediaStream;
      }),
    ),
  setIsMyVideoOn: (isMyVideoOn) =>
    set(
      produce((draft: States) => {
        draft.isMyVideoOn = isMyVideoOn;
      }),
    ),
  setIsMyAudioOn: (isMyAudioOn) =>
    set(
      produce((draft: States) => {
        draft.isMyAudioOn = isMyAudioOn;
      }),
    ),
}));

export default useMyMediaStreamStore;
