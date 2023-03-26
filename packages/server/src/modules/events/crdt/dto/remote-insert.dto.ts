import Node from '~/lib/crdt/node';

export class RemoteInsertDto {
  id: string;
  operation: {
    node: Node;
  };
}
