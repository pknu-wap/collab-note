import { Identifier } from '@collab-note/common';

export class RemoteDeleteDto {
  id: string;
  operation: {
    targetId: Identifier | null;
    clock: number;
  };
}
