import { Identifier } from './identifier';

export class Node {
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

  // this가 node보다 앞에 있으면 true, 아니면 false
  precedes(node: Node) {
    // this.prev가 node.prev와 다르면, this가 node보다 앞에 있음.
    if (JSON.stringify(this.prev) !== JSON.stringify(node.prev)) return false;
    // this.prev가 node.prev와 같으면, this.id와 node.id를 비교.
    // this.id가 node.id보다 작으면, this가 node보다 앞에 있음.
    if (node.id.clock < this.id.clock) return true;
    if (this.id.clock === node.id.clock && this.id.client < node.id.client)
      return true;

    return false;
  }
}
