export default class Queue<T> {
  public queue: T[];
  private length: number;

  constructor(queue: T[], length: number) {
    this.queue = queue;
    this.length = length;
  }

  add(x: T) {
    if (this.queue.length >= this.length) {
      this.queue.unshift(x);
      this.queue.pop();
    } else {
      this.queue.unshift(x);
    }
  }
}
