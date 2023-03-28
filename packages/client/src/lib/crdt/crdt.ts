import Identifier from './identifier';
import LinkedList from './linkedList';
import Node from './node';

class CRDT {
  private clock: number;
  private client: number;
  private structure: LinkedList;

  constructor(client: number, initialStructure: LinkedList) {
    this.client = client;
    this.structure = new LinkedList(initialStructure);

    const { nodeMap } = initialStructure;

    // 처음 생성할 때
    if (!nodeMap || !nodeMap.size) {
      this.clock = 1;
      return this;
    }

    // 처음 생성이 아닐 때
    // nodeMap의 clock 중 가장 큰 값을 찾아서 clock에 넣음.
    const maxClock = Object.keys(nodeMap)
      .map((id) => Number(JSON.parse(id).clock))
      .reduce((acc, cur) => Math.max(acc, cur), 0);

    this.clock = maxClock + 1;
  }

  get data() {
    return this.structure;
  }

  localInsert(index: number, value: string) {
    const id = new Identifier(this.clock++, this.client);

    const remoteInsertion = this.structure.insertByIndex(id, index, value);

    return remoteInsertion;
  }

  remoteInsert({ node }: { node: Node }) {
    const prevIndex = this.structure.insertById(node);

    // clock이 같은 경우, clock을 증가시킴.
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

    // clock이 같은 경우, clock을 증가시킴.
    // localDelete()에서 clock을 증가시키지 않았기 때문에, 여기서 clock을 증가시켜야 함.
    if (++this.clock < clock) {
      this.clock = clock + 1;
    }

    return targetIndex;
  }

  read() {
    return this.structure.stringify();
  }
}

export default CRDT;
