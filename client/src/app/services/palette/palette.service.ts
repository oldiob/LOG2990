import { RingBuffer } from "../../utils/ring_buffer";

export class ColorPalette {

    primary   : number;
    secondary : number;
    previous  : RingBuffer<number>

    constructor(primary : number, secondary : number) {
	const max_history : number = 10;

	this.primary   = primary;
	this.secondary = secondary;
	this.previous  = new RingBuffer<number>(max_history);
    }

    swap() {
	let tmp : number = this.primary;
	this.primary     = this.secondary;
	this.secondary =   tmp;
    }

    selectPrimary(color : number) {
	let previous : number = this.primary;
	this.primary = color;
	this.previous.add(previous);
    }

    selectSecondary(color : number) {
	let previous : number = this.secondary;
	this.secondary = color;
	this.previous.add(previous);
    }
}
