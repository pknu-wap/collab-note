import produce from 'immer';
import { create } from 'zustand';

type States = {
  userStreams: { [key: string]: MediaStream | null };
};

type Actions = {
  setUserStreams: ({
    sid,
    stream,
  }: {
    sid: string;
    stream: MediaStream;
  }) => void;
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
}));

export default useUserStreamsStore;
