import { Component, OnInit } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { SelectorTool } from 'src/services/tool/tool-options/selector';
import { ToolService } from 'src/services/tool/tool.service';
import { EraserTool } from 'src/services/tool/tool-options/eraser';

@Component({
    selector: 'app-selector-option',
    templateUrl: './selector-option.component.html',
    styleUrls: ['./selector-option.component.scss', '../toolbar-option.scss'],
})
export class SelectorOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';

    images = new Map<ITool, string>([
        [this.selector, 'selector.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    isShowPrimary: boolean;
    isShowSecondary: boolean;
    primaryColor: string;
    secondaryColor: string;

    readonly IS_PRIMARY = true;

    constructor(
        private paletteService: PaletteService,
        private toolService: ToolService,
        private selector: SelectorTool,
        private eraser: EraserTool) {

        this.tools = [eraser, selector];
        this.currentTool = this.tools[0];
    }

    ngOnInit() {
        this.currentTool = this.selector;
        this.isShowPrimary = false;
        this.isShowSecondary = false;
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

    togglePrimaryColorPicker() {
        this.isShowSecondary = false;
        this.isShowPrimary = !this.isShowPrimary;
    }

    toggleSecondaryColorPicker() {
        this.isShowPrimary = false;
        this.isShowSecondary = !this.isShowSecondary;
    }

    onSwap() {
        this.paletteService.swap();
        this.setPrimaryColor();
        this.setSecondary();
    }

    onColorPick() {
        this.isShowPrimary ? this.setPrimaryColor() : this.setSecondary();
        this.hideColorPicker();
    }

    hideColorPicker() {
        this.isShowPrimary ? this.isShowPrimary = false
            : this.isShowSecondary = false;
    }

    private setPrimaryColor() {
        return {
            'background-color': this.paletteService.getPrimary(),
        };
    }

    private setSecondary() {
        return {
            'background-color': this.paletteService.getSecondary(),
        };
    }

}
