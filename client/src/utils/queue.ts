export class Queue<T> {

    private firstNode: Node<T> | null;
    private lastNode: Node<T> | null;

    constructor() {
        this.firstNode = null;
        this.lastNode = null;
    }

    push(el: T): void {
        const beforeLast = this.lastNode;
        this.lastNode = { element: el, next: null };

        if (beforeLast === null) {
            this.firstNode = this.lastNode;
        } else {
            beforeLast.next = this.lastNode;
        }
    }

    next(): T | null {
        if (this.firstNode === null) {
            return null;
        }
        const element = this.firstNode.element;

        if (this.firstNode.next === null) {
            this.firstNode = null;
            this.lastNode = null;
        } else {
            this.firstNode = this.firstNode.next;
        }

        return element;
    }
}

interface Node<T> {
    element: T | null;
    next: Node<T> | null;
}