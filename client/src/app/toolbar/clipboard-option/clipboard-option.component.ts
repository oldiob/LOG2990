import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'src/services/clipboard/clipboard.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';

interface ClipboardAction {
    tip: string;
    icon: string;
    action: (() => void);
}

@Component({
    selector: 'app-clipboard-option',
    templateUrl: './clipboard-option.component.html',
    styleUrls: ['../toolbar-option.scss', './clipboard-option.component.scss'],
})
export class ClipboardOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    tip: string;
    images: Map<ITool, string>;

    actions: ClipboardAction[];

    constructor(private clipboard: ClipboardService) { }

    ngOnInit() {
        this.setupActions();
        this.tip = 'Clipboard';
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
                action: () => { /* To be implemented*/ },
            },
            {
                tip: 'Delete (Delete)',
                icon: this.FILE_LOCATION + 'clipboard/delete.png',
                action: () => { /* To be implemented*/ },
            },
            {
                tip: 'Select-All (Ctrl + A)',
                icon: this.FILE_LOCATION + 'clipboard/select-all.png',
                action: () => { /* To be implemented*/ },
            },
        ];
    }

    select() {
        //
    }

    getImage(): string {
        const clipboardURL = 'clipboard.png';
        return this.FILE_LOCATION + clipboardURL;
    }
}
