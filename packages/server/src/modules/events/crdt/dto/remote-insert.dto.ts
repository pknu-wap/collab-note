import Node from '~/lib/crdt/node';

export class RemoteInsertDto {
  operation: {
    node: Node;
  };
}
