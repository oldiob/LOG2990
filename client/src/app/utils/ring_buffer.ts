export class RingBuffer<T> {
    readonly len   : number;
    index : number;
    arr   : Array<T>;
    constructor(len : number) {
	this.index = 0;
	this.len = len;
	this.arr = new Array<T>(len);
    }
    add(x : T) {
	let i = this.index % this.len;
	this.index += 1;
	this.arr[i] = x;
    }
}
