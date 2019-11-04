import { Component, OnInit } from '@angular/core';
import { EraserTool } from 'src/services/tool/tool-options/eraser';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { SelectorTool } from 'src/services/tool/tool-options/selector';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
    selector: 'app-selector-option',
    templateUrl: './selector-option.component.html',
    styleUrls: ['./selector-option.component.scss', '../toolbar-option.scss'],
})
export class SelectorOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    tip = 'Selector (S)';
    images = new Map<ITool, string>([
        [this.selector, 'selector.png'],
        [this.eraser, 'eraser.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    constructor(
        private toolService: ToolService,
        private selector: SelectorTool,
        private eraser: EraserTool) {

        this.tools = [selector, eraser];
        this.currentTool = this.tools[0];
        this.select();
    }

    ngOnInit() {
        this.currentTool = this.selector;
    }

    select() {
        this.selectTool(this.currentTool);
    }

    getImage(): string {
        return this.images.get(this.currentTool) as string;
    }

    selectTool(tool: ITool): void {
        this.currentTool = tool;
        this.toolService.currentTool = tool;
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }
}
