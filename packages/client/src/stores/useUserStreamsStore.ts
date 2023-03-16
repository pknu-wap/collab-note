import produce from 'immer';
import { create } from 'zustand';

type States = {
  userStreams: { [sid: string]: MediaStream | null };
};

type Actions = {
  setUserStreams: ({
    sid,
    stream,
  }: {
    sid: string;
    stream: MediaStream;
  }) => void;
  setUserStreamsEmpty: () => void;
  deleteUserStreams: (sid: string) => void;
};

const useUserStreamsStore = create<States & Actions>((set) => ({
  userStreams: {},
  setUserStreams: ({ sid, stream }) => {
    set(
      produce((draft: States) => {
        draft.userStreams[sid] = stream;
      }),
    );
  },
  deleteUserStreams: (sid: string) => {
    set(
      produce((draft: States) => {
        delete draft.userStreams[sid];
      }),
    );
  },
  setUserStreamsEmpty: () => {
    set(
      produce((draft: States) => {
        draft.userStreams = {};
      }),
    );
  },
}));

export default useUserStreamsStore;
