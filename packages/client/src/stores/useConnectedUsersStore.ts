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
  deleteConnectedUser: (sid: string) => void;
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
  deleteConnectedUser: (sid) =>
    set(
      produce((draft: States) => {
        draft.connectedUsers = draft.connectedUsers.filter(
          (user) => user.sid !== sid,
        );
      }),
    ),
}));

export default useConnectedUsersStore;
