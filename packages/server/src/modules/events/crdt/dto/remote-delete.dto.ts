import Identifier from '~/lib/crdt/identifier';

export class RemoteDeleteDto {
  operation: {
    targetId: Identifier | null;
    clock: number;
  };
}
