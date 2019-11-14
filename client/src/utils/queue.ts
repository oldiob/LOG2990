export class Queue<T> {

    private firstNode: Node<T> | null;
    private lastNode: Node<T>;

    constructor() {
        this.firstNode = { element: null, next: null };
        this.lastNode = this.firstNode;
    }

    push(el: T): void {
        const beforeLast = this.lastNode;
        this.lastNode = { element: el, next: null };
        beforeLast.next = this.lastNode;
    }

    next(): T | null {
        if (this.firstNode === null) {
            return null;
        }

        const element = this.firstNode.element;
        this.firstNode = this.firstNode.next;

        return element;
    }
}

interface Node<T> {
    element: T | null;
    next: Node<T> | null;
}