import Identifier from './identifier';
import Node from './node';

// remote에도 전달
interface RemoteInsertOperation {
  prevId: Identifier | null;
  node: Node;
}

class LinkedList {
  head: Node;
  constructor(head: Node) {
    this.head = head;
  }

  insertByIndex() {
    // local operation
    return '삽입할 위치의 node의 id, 새로운 node';
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
}

export default LinkedList;
