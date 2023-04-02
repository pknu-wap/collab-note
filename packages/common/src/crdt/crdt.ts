import { Identifier } from './identifier';
import { LinkedList } from './linked-list';
import { Node } from './node';

export class CRDT {
  private clock: number;
  private client: number;
  private structure: LinkedList;

  constructor(client: number, initialStructure: LinkedList) {
    this.client = client;

    this.structure = new LinkedList(initialStructure);

    const { nodeMap } = initialStructure;

    if (!nodeMap) {
      this.clock = 1;
      return this;
    }

    // logical clock 동기화를 위함
    const maxClock = Object.keys(nodeMap)
      .map((id) => Number(JSON.parse(id).clock))
      .reduce((prev, cur) => Math.max(prev, cur), 0);

    this.clock = maxClock + 1;
  }

  get data() {
    return this.structure;
  }

  localInsert(index: number, value: string) {
    const id = new Identifier(this.clock++, this.client);

    console.log(id, index, value);

    const remoteInsertion = this.structure.insertByIndex(id, index, value);
    return remoteInsertion;
  }

  remoteInsert({ node }: { node: Node }) {
    const prevIndex = this.structure.insertById(node);

    // clock이 같은 경우, clock을 증가시킴. (동기화를 위함)
    if (++this.clock < node.id.clock) {
      this.clock = node.id.clock + 1;
    }

    return prevIndex;
  }

  localDelete(index: number) {
    const targetId = this.structure.deleteByIndex(index);

    // 여기 clock을 증가시키지 않는 이유는, remoteDelete()에서 clock을 증가시키기 때문.
    return { targetId, clock: this.clock };
  }

  remoteDelete({
    targetId,
    clock,
  }: {
    targetId: Identifier | null;
    clock: number;
  }) {
    const targetIndex = this.structure.deleteById(targetId);

    // clock이 같은 경우, clock을 증가시킴. (동기화를 위함)
    if (++this.clock < clock) {
      this.clock = clock + 1;
    }

    return targetIndex;
  }

  read() {
    return this.structure.stringify();
  }
}
