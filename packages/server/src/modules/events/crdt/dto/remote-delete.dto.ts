import { Identifier } from '@collab-note/common';

export class RemoteDeleteDto {
  operation: {
    targetId: Identifier | null;
    clock: number;
  };
}
