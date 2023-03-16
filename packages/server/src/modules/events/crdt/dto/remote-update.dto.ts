import Node from '~/lib/crdt/node';

export class RemoteUpdateDto {
  operations: {
    node: Node;
  }[];
}
