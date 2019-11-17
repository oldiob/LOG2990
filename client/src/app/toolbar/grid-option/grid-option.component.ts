import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/services/grid/grid.service';
import { GridTool } from 'src/services/tool/tool-options/grid';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { ToolService } from 'src/services/tool/tool.service';
import { Compass } from 'src/utils/compass';
@Component({
    selector: 'app-grid-option',
    templateUrl: './grid-option.component.html',
    styleUrls: ['../toolbar-option.scss', './grid-option.component.scss'],
})
export class GridOptionComponent implements OnInit, IOption<ITool> {
    Compass = Compass;
    private readonly FILE_LOCATION = '../../../../assets/images/';

    tip = 'Grid (G)';

    images = new Map<ITool, string>([
        [this.gridTool, 'grid.png'],
    ]);

    readonly directions = new Map<Compass, string>([
        [Compass.C, 'Center'],
        [Compass.N, 'North'],
        [Compass.E, 'East'],
        [Compass.S, 'South'],
        [Compass.W, 'West'],
        [Compass.NW, 'North West'],
        [Compass.NE, 'North East'],
        [Compass.SW, 'South West'],
        [Compass.SE, 'South East'],
    ]);

    tools: ITool[];
    currentTool: ITool;

    isOn: boolean;
    isMagnetOn: boolean;
    opacity: number;
    step: number;
    anchor: Compass;

    constructor(
        private toolService: ToolService,
        private gridService: GridService,
        private gridTool: GridTool) {
    }

    ngOnInit() {
        this.tools = [this.gridTool];
        this.currentTool = this.tools[0];
        this.opacity = 1;

        this.subscribeGrid();
    }

    private subscribeGrid() {
        this.gridService.isOnObservable.subscribe((isOn: boolean) => {
            this.isOn = isOn;
        });
        this.gridService.stepObservable.subscribe((step: number) => {
            this.step = step;
        });
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
        this.gridService.toggle();
    }

    onAnchor(): void {
        this.gridService.anchor = this.anchor;
    }

    onOpacity(): void {
        this.gridService.opacity = this.opacity;
    }

    onStep(): void {
        this.gridService.step = this.step;
    }

    addStep(): void {
        this.gridService.addStep();
    }

    reduceStep(): void {
        this.gridService.reduceStep();
    }

    getFilesource(tool: ITool): string {
        return this.FILE_LOCATION + this.images.get(tool) as string;
    }
}
