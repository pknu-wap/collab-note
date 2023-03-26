import Node from '~/lib/crdt/node';

export class RemoteUpdateDto {
  id: string;
  operations: {
    node: Node;
  }[];
}
