import Identifier from './identifier';

class Node {
  id: Identifier;
  value: string;
  prev: Identifier | null;
  next: Identifier | null;

  constructor(id: Identifier, value: string) {
    this.id = id;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  precedes(id: Identifier) {
    if (this.id.clock < id.clock) return true;

    if (this.id.clock === id.clock && this.id.client < id.client) return true;

    return false;
  }
}

export default Node;
