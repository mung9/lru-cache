export class LRUCache<TKey, TValue> {
  public constructor(public readonly capacity: number) {
    if (capacity < 2) {
      throw new Error('The capacity must be greater than or equal to 1.');
    }
  }

  public put(key: TKey, value: TValue): void {
    const alreadyExistingNode = this.nodes.get(key);

    if (alreadyExistingNode) {
      alreadyExistingNode.value = value;
      this.moveToFront(alreadyExistingNode);
      return;
    }

    if (this.isFull() && this.rear) {
      const extractedNode = this.extract(this.rear);
      this.nodes.delete(extractedNode.key);
    }

    const newNode = new Node(key, value);
    this.nodes.set(key, newNode);
    this.insertIntoFront(newNode);
  }

  public get(key: TKey): TValue | undefined {
    const node = this.nodes.get(key);

    if (node) {
      this.moveToFront(node);
      return node.value;
    } else {
      return undefined;
    }
  }

  public isFull(): boolean {
    return this.nodes.size === this.capacity;
  }

  public values(): TValue[] {
    const values: TValue[] = [];
    let node = this.front;
    while (node) {
      values.push(node.value);
      node = node.next;
    }

    return values;
  }

  public keys(): TKey[] {
    const keys: TKey[] = [];
    let node = this.front;
    while (node) {
      keys.push(node.key);
      node = node.next;
    }

    return keys;
  }

  private readonly nodes: Map<TKey, Node<TKey, TValue>> = new Map();
  private front?: Node<TKey, TValue>;
  private rear?: Node<TKey, TValue>;

  private moveToFront(node: Node<TKey, TValue>) {
    this.extract(node);
    this.insertIntoFront(node);
  }

  private extract(node: Node<TKey, TValue>): Node<TKey, TValue> {
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.rear = node.prev;
    }

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.front = node.next;
    }

    return node;
  }

  private insertIntoFront(node: Node<TKey, TValue>) {
    node.next = this.front;

    if (this.front) {
      this.front.prev = node;
    }

    if (!this.rear) {
      this.rear = node;
    }

    this.front = node;
  }
}

class Node<TKey, TValue> {
  public prev?: Node<TKey, TValue>;
  public next?: Node<TKey, TValue>;
  constructor(public key: TKey, public value: TValue) {}
}
