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
    styleUrls: ['../toolbar-option.scss', './grid-option.component.scss'],
})
export class GridOptionComponent implements OnInit, IOption<ITool> {

    private readonly FILE_LOCATION = '../../../../assets/images/';

    images = new Map<ITool, string>([
        [this.gridTool, 'grid.png'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    isOn: boolean;
    opacity: number;
    step: number;

    constructor(
        private toolService: ToolService,
        public gridService: GridService,
        private gridTool: GridTool) {
    }

    ngOnInit() {
        this.tools = [this.gridTool];
        this.currentTool = this.tools[0];
        this.isOn = false;
        this.opacity = 1;
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

    toggleGrid(): void {
        if (this.isOn) {
            this.gridService.draw();
        } else {
            this.gridService.clear();
        }
    }

    onOpacity(): void {
        this.gridService.opacity = this.opacity;
    }

    onStep(): void {
        this.gridService.step = this.step;
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }
}
