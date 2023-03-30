import { Node } from '@collab-note/common';

export class RemoteInsertDto {
  id: string;
  operation: {
    node: Node;
  };
}
