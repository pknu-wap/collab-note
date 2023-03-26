import Identifier from '~/lib/crdt/identifier';

export class RemoteDeleteDto {
  id: string;
  operation: {
    targetId: Identifier | null;
    clock: number;
  };
}
