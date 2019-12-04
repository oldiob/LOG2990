import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'src/services/clipboard/clipboard.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { SelectorTool } from 'src/services/tool/tool-options/selector';
import { ToolService } from 'src/services/tool/tool.service';

interface ClipboardAction {
    tip: string;
    icon: string;
    action: (() => void);
}

@Component({
    selector: 'app-selector-option',
    templateUrl: './selector-option.component.html',
    styleUrls: ['./selector-option.component.scss', '../toolbar-option.scss'],
})
export class SelectorOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';
    tip: string;

    private tools: ITool[];
    actions: ClipboardAction[];
    isSelectorActive: boolean;

    constructor(
        private clipboard: ClipboardService,
        private toolService: ToolService,
        private selector: SelectorTool) {
        this.tip = 'Selector (S)';
        this.isSelectorActive = false;
        this.tools = [selector];
        this.setupActions();
        this.subscribeSelector();
    }

    ngOnInit() {
        //
    }

    selectTool(tool: ITool): void {
        this.select();
    }
    private subscribeSelector() {
        this.selector.isSelectedObservable.subscribe((isSelected: boolean) => {
            this.isSelectorActive = isSelected;
        });
    }

    private setupActions() {
        this.actions = [
            {
                tip: 'Copy (Ctrl + C)',
                icon: this.FILE_LOCATION + 'clipboard/copy.png',
                action: () => { this.clipboard.copy(); },
            },
            {
                tip: 'Paste (Ctrl + V)',
                icon: this.FILE_LOCATION + 'clipboard/paste.png',
                action: () => { this.clipboard.paste(); },
            },
            {
                tip: 'Cut (Ctrl + X)',
                icon: this.FILE_LOCATION + 'clipboard/cut.png',
                action: () => { this.clipboard.cut(); },
            },
            {
                tip: 'Duplicate (Ctrl + D)',
                icon: this.FILE_LOCATION + 'clipboard/duplicate.png',
                action: () => { this.selector.duplicate(); },
            },
            {
                tip: 'Delete (Delete)',
                icon: this.FILE_LOCATION + 'clipboard/delete.png',
                action: () => { this.selector.erase(); },
            },
            {
                tip: 'Select-All (Ctrl + A)',
                icon: this.FILE_LOCATION + 'clipboard/select-all.png',
                action: () => { this.selector.selectAll(); },
            },
        ];
    }

    select() {
        this.toolService.currentTool = this.tools[0];
    }

    getImage(): string {
        const FILENAME = 'selector.png';
        return FILENAME;
    }
}
