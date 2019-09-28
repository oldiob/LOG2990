import { Injectable } from '@angular/core';
import { ITool } from './tool-options/i-tool';

/**
 * ToolService is used to access the current tool and to change tools ONLY.
 */
@Injectable({
    providedIn: 'root',
})
export class ToolService {

    currentTool: ITool;

    constructor() {
        //
    }
}
