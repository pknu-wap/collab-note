import { Node } from '@collab-note/common';

export class RemoteUpdateDto {
  id: string;
  operations: {
    node: Node;
  }[];
}
