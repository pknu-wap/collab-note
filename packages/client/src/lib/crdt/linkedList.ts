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

  // local operations
}

export default LinkedList;
