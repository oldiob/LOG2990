import { Component, OnInit } from '@angular/core';
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
    tip = 'Selector (S)';

    private tools: ITool[];

    constructor(
        private toolService: ToolService,
        private selector: SelectorTool) {
            this.tools = [selector];
    }

    ngOnInit() {
        //
    }

    selectTool(tool: ITool): void {
        this.select();
    }

    select() {
        this.toolService.currentTool = this.selector;
    }

    getImage(): string {
        const FILENAME = 'selector.png';
        return FILENAME;
    }
}
