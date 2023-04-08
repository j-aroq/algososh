interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  push = (item: T): void => {
    this.container.push(item);
  };
  pop = (): void => {
    this.container.pop();
  };
  peak = (): T | null => {
    if (this.getSize()) return this.container[this.getSize() - 1];
    return null;
  };
  getElemets = () => this.container;
  getSize = () => this.container.length;
  clear = () => (this.container = []);
}
