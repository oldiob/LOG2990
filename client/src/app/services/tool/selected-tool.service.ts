import { Injectable } from '@angular/core';
import { ITool } from './tool-options/i-tool';
import { NavigationHand } from './tool-options/navigation-hand';

@Injectable({
	providedIn: 'root'
})
export class CurrentToolService {

	currentTool: ITool;

	constructor() { 

		// no tool selected, so just navigate around
		this.currentTool = new NavigationHand();
	}

}
