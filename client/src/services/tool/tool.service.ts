import { Injectable } from '@angular/core';
import { ITool } from './tool-options/i-tool';

@Injectable({
    providedIn: 'root',
})
export class ToolService {
    private mCurrentTool: ITool;

    set currentTool(tool: ITool) {
        if (this.mCurrentTool !== undefined && this.mCurrentTool.onUnSelect) {
            this.mCurrentTool.onUnSelect();
        }

        this.mCurrentTool = tool;
    }

    get currentTool(): ITool {
        return this.mCurrentTool;
    }
}
