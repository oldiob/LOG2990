import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/services/grid/grid.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { GridTool } from 'src/services/tool/tool-options/grid';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
    selector: 'app-grid-option',
    templateUrl: './grid-option.component.html',
    styleUrls: ['./grid-option.component.scss', '../toolbar-option.scss'],
})
export class GridOptionComponent implements OnInit, IOption<ITool> {
    private readonly FILE_LOCATION = '../../../../assets/images/';

       images = new Map<ITool, string>([
        [this.grid, 'grid.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    isShowPrimary: boolean;
    isShowSecondary: boolean;
    primaryColor: string;
    secondaryColor: string;

    constructor(
        private paletteService: PaletteService,
        private toolService: ToolService,
        public gridService: GridService,
        private grid: GridTool) {
        this.tools = [grid];
        this.currentTool = this.tools[0];
    }

    ngOnInit() {
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
