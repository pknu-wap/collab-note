import Identifier from './identifier';
import Node from './node';

interface NodeMap {
  [index: string]: Node;
}

class LinkedList {
  head: Identifier | null;
  nodeMap: NodeMap;

  constructor(initialStructure?: LinkedList) {
    if (!initialStructure) {
      this.head = null;
      this.nodeMap = {};

      return this;
    }

    const { head, nodeMap } = initialStructure;

    this.head = head;

    if (!nodeMap) {
      this.nodeMap = {};
      return this;
    }

    // nodeMap의 prototype을 Node.prototype으로 설정
    // 이렇게 하지 않으면, nodeMap의 prototype이 Object.prototype이 되어서
    // nodeMap의 메서드를 사용할 수 없음.
    // example: nodeMap[id].next
    // nodeMap[id]는 Node의 인스턴스이지만, nodeMap[id].next는 undefined가 됨.
    // 이를 방지하기 위해 prototype을 Node.prototype으로 설정해줌.
    // 이렇게 하면, nodeMap[id].next를 사용할 수 있음.
    const nodeMapWithPrototype = Object.entries(nodeMap).reduce<NodeMap>(
      (prev, [id, node]) => {
        Object.setPrototypeOf(node, Node.prototype);
        prev[id] = node;

        return prev;
      },
      {},
    );

    this.nodeMap = nodeMapWithPrototype;
  }

  insertByIndex(id: Identifier, index: number, value: string) {
    const node = new Node(id, value);

    if (!this.head || index === -1) {
      node.next = this.head;
      node.prev = null;
      this.head = id;

      return { node };
    }

    const prevNode = this.findNodeByIndex(index);

    node.next = prevNode.next;
    prevNode.next = node.id;

    node.prev = prevNode.id;
    return { node };
  }

  deleteByIndex() {
    // local operation
    return '삭제할 node의 id';
  }

  insertById() {
    // remote operation
    return '변경이 일어난 인덱스';
  }

  deleteById() {
    // remote operation
    return '변경이 일어난 인덱스';
  }

  stringify() {
    // 문자열을 합쳐주는 메서드
    return;
  }

  private findNodeByIndex(index: number) {
    let count = 0;
    let currentNode: Node | null = this.getHeadNode();

    while (count < index && currentNode) {
      currentNode = this.getNode(currentNode.next);
      count++;
    }

    if (!currentNode) throw new Error('index out of range');

    return currentNode;
  }

  private getHeadNode() {
    if (!this.head) return null;

    return this.getNode(this.head);
  }

  private getNode(id: Identifier | null) {
    if (!id) return null;

    return this.nodeMap[JSON.stringify(id)];
  }
}

export default LinkedList;
