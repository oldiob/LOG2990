import { ITool } from './i-tool';

export class CurrentToolService implements ITool {

	constructor() { }

	leftClick() {
		throw new Error("Method not implemented.");
	}
	leftRelease() {
		throw new Error("Method not implemented.");
	}

}
