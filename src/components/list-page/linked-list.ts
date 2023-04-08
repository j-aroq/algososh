export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  toArray: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor(initialState?: T[]) {
    this.head = null;
    this.size = 0;
    initialState?.forEach((element) => {
      this.append(element);
    });
  }

  insertAt(element: T, position: number) {
    if (position < 0 || position > this.size) {
      return null;
    } else {
      const node = new Node(element);

      if (position === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;

        while (currIndex < position && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }

        if (prev) prev.next = node;
        node.next = curr;
      }
      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current && current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    let node = new Node(element);

    if (!this.head) {
      this.head = node;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  addByIndex(position: number) {
    if (position < 0 || position > this.size) {
      return null;
    }

    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current!.next;
      index++;
    }
    return current!.value;
  }

  deleteByIndex(position: number) {
    if (position < 0 || position > this.size) {
      return null;
    }

    let current = this.head;
    if (position === 0) {
      this.head = current!.next;
    } else {
      let prev = null;
      let index = 0;

      while (index < position) {
        prev = current;
        current = current!.next;
        index++;
      }
      if (prev) prev.next = current!.next;
    }
    this.size--;
    return current!.value;
  }

  getSize() {
    return this.size;
  }

  toArray() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}
