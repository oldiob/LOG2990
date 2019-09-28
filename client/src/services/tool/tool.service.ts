import { Injectable } from '@angular/core';
import { ITool } from './tool-options/i-tool';


@Injectable({
    providedIn: 'root',
})
export class ToolService {

    currentTool: ITool;

    set tool(tool: ITool) {
        this.currentTool = tool;
    }

    get tool(): ITool {
        return this.currentTool;
    }

    // Dummy
    getCurrentToolIndex(): number { return 0; }
    setCurrentToolIndex(i: number) { return; }
    getToolFilename(i: number): string { return ""; }
}
