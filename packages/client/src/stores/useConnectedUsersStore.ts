import produce from 'immer';
import { create } from 'zustand';

interface ConnectedUserInfo {
  sid: string;
}

type States = {
  connectedUsers: ConnectedUserInfo[];
};

type Actions = {
  setConnectedUsers: (connectedUsers: ConnectedUserInfo[]) => void;
};

const useConnectedUsersStore = create<States & Actions>((set) => ({
  connectedUsers: [],
  setConnectedUsers: (connectedUsers) =>
    set(
      produce((draft: States) => {
        draft.connectedUsers = connectedUsers;
      }),
    ),
}));

export default useConnectedUsersStore;
