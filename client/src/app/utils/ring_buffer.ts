export class RingBuffer<T> {
    readonly len: number;
    index: number;
    arr: T[];
    constructor(len: number) {
        this.index = 0;
        this.len = len;
        this.arr = new Array<T>(len);
    }
    add(x: T) {
        this.arr[this.index++] = x;
        if (this.index >= this.len) {
            this.index = 0;
        }
    }
}
