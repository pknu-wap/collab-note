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
  addConnectedUser: (connectedUser: ConnectedUserInfo) => void;
};

const useConnectedUsersStore = create<States & Actions>((set) => ({
  connectedUsers: [],
  setConnectedUsers: (connectedUsers) =>
    set(
      produce((draft: States) => {
        draft.connectedUsers = connectedUsers;
      }),
    ),
  addConnectedUser: (connectedUser) =>
    set(
      produce((draft: States) => {
        draft.connectedUsers.push(connectedUser);
      }),
    ),
}));

export default useConnectedUsersStore;
