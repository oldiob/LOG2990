import { Injectable } from '@angular/core';
import { ShowcaseSignal } from 'src/utils/showcase-signal';
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

        if (this.mCurrentTool.onSelect) {
            this.mCurrentTool.onSelect();
        }

        ShowcaseSignal.emit();
    }

    get currentTool(): ITool {
        return this.mCurrentTool;
    }
}
