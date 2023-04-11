import { Identifier } from './identifier';
import { Node } from './node';

export interface NodeMap {
  [index: string]: Node;
}

export interface RemoteInsertOperation {
  node: Node;
}

export interface RemoteDeleteOperation {
  targetId: Identifier | null;
  clock: number;
}

export class LinkedList {
  head: Identifier | null;
  nodeMap: NodeMap;

  constructor(initialStructure?: LinkedList) {
    this.head = null;
    this.nodeMap = {};

    if (initialStructure) {
      const { head, nodeMap } = initialStructure;

      this.head = head ?? null;

      Object.entries(nodeMap).forEach(([id, node]) => {
        Object.setPrototypeOf(node, Node.prototype);
        this.nodeMap[id] = node;
      });
    }
  }

  insertByIndex(
    id: Identifier,
    index: number,
    value: string,
  ): RemoteInsertOperation {
    const node = new Node(id, value);
    this.setNode(id, node);

    if (!this.head || index === -1) {
      node.next = this.head;
      node.prev = null;
      this.head = id;

      return { node };
    }

    const prevNode = this.findByIndex(index);

    // insert node between prevNode and nextNode
    node.next = prevNode.next;
    prevNode.next = node.id;
    node.prev = prevNode.id;

    return { node };
  }

  insertById(node: Node): number | null {
    try {
      Object.setPrototypeOf(node, Node.prototype);
      this.setNode(node.id, node);

      let prevNode: Node | null;
      let prevIndex: number;

      // node.prev가 존재하지 않으면, head를 찾아서 prevNode에 할당
      if (!node.prev) {
        const head = this.getHeadNode();

        if (!head || node.precedes(head)) {
          node.next = this.head;
          this.head = node.id;

          return null;
        }

        prevNode = head;
        prevIndex = 0;
      } else {
        // node.prev가 존재하면, node.prev를 찾아서 prevNode에 할당
        const { node: targetNode, index: targetIndex } = this.findById(
          node.prev,
        );

        prevNode = targetNode;
        prevIndex = targetIndex;
      }

      if (!prevNode) return null;

      // prevNode.next가 존재하면, prevNode.next를 찾아서 nextNode에 할당
      while (prevNode.next && this.getNode(prevNode.next)?.precedes(node)) {
        prevNode = this.getNode(prevNode.next);
        prevIndex++;

        if (!prevNode) return null;
      }

      // insert node between prevNode and nextNode
      node.next = prevNode.next;
      prevNode.next = node.id;
      node.prev = prevNode.id;

      return prevIndex + 1;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  deleteByIndex(index: number): Identifier | null {
    try {
      // head deleted
      if (index === 0) {
        const head = this.getHeadNode();
        if (!head) throw new Error('head not found');

        const nextNode = this.getNode(head.next);

        if (!nextNode) {
          this.head = null;
          // this.deleteNode(head.id);
          return null;
        }

        nextNode.prev = null;

        this.deleteNode(head.id);
        this.head = head.next;

        return null;
      }

      const prevNode = this.findByIndex(index - 1);

      if (!prevNode.next) throw new Error(`node with index ${index} not found`);

      const targetNode = this.getNode(prevNode.next);

      if (!targetNode) throw new Error(`node with index ${index} not found`);

      this.deleteNode(targetNode.id);
      prevNode.next = targetNode.next;

      return targetNode.id;
    } catch (e) {
      console.error('deleteByIndex error\n', e);
      return null;
    }
  }

  deleteById(id: Identifier | null): number | null {
    try {
      // head deleted
      if (!id) {
        const head = this.getHeadNode();
        if (!head) throw new Error(`head not found`);
        this.head = head.next;
        // this.deleteNode(head.id);
        return null;
      }

      const { node: targetNode, index: targetIndex } = this.findById(id);
      if (!targetNode) throw new Error(`node with id ${id} not found`);
      const prevNode = this.findByIndex(targetIndex - 1);

      prevNode.next = targetNode.next;

      this.deleteNode(id);

      return targetIndex;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  stringify(): string {
    let node: Node | null = this.getHeadNode();
    let result = '';

    while (node) {
      result += node.value;
      node = this.getNode(node.next);
    }

    console.log('stringify', result);

    return result;
  }

  private findByIndex(index: number): Node {
    let count = 0;
    let currentNode: Node | null = this.getHeadNode();

    while (count < index && currentNode) {
      currentNode = this.getNode(currentNode.next);
      count++;
    }

    if (!currentNode) throw new Error('node not found');

    return currentNode;
  }

  private findById(id: Identifier) {
    let count = 0;
    let currentNode: Node | null = this.getHeadNode();

    while (currentNode) {
      if (JSON.stringify(currentNode.id) === JSON.stringify(id)) {
        return { node: currentNode, index: count };
      }
      currentNode = this.getNode(currentNode.next);
      count++;
    }

    throw new Error(`node with id ${id} not found`);
  }

  private getHeadNode() {
    if (!this.head) return null;

    return this.getNode(this.head);
  }

  private getNode(id: Identifier | null): Node | null {
    if (!id) return null;

    return this.nodeMap[JSON.stringify(id)];
  }

  private setNode(id: Identifier, node: Node) {
    this.nodeMap[JSON.stringify(id)] = node;
  }

  private deleteNode(id: Identifier) {
    delete this.nodeMap[JSON.stringify(id)];
  }
}
