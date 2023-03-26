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

  localInsert(index: number, value: string) {
    // 1. 입력된 문자의 left, right를 찾음.
    // 2. left.id, right.id 사이의 id를 만듦 -> { id, content }, CRDT에 넣기: merge()
    // 3. socket.emit('insert', operation)

    const id = new Identifier(this.clock++, this.client);
    const remoteInsertion = this.structure.insertByIndex(id, index, value);

    return remoteInsertion;
  }

  localDelete(index: number) {
    // 1. CRDT에서 n번째 문자 찾기.
    // 2. CRDT에서 n번째 문자 지우기: merge()
    // 3. socket.emit('delete', operation)

    return;
  }

  remoteInsert({ node }: { node: Node }) {
    // 1. CRDT에서 받은 문자가 들어가야 할 index를 찾음: findIndex()
    // 2. CRDT에 넣기: merge()

    const prevIndex = this.structure.insertById(node);

    // clock이 같은 경우, clock을 증가시킴.
    if (++this.clock < node.id.clock) {
      this.clock = node.id.clock + 1;
    }

    return prevIndex;
  }

  remoteDelete() {
    // 1. CRDT에서 삭제된 문자의 index를 찾음: findIndex()
    // 2. CRDT에서 지우기: merge()
    return;
  }
}

export default CRDT;
