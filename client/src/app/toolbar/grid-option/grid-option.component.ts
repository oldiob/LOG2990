import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/services/grid/grid.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { Compass } from 'src/utils/compass';
@Component({
    selector: 'app-grid-option',
    templateUrl: './grid-option.component.html',
    styleUrls: ['../toolbar-option.scss', './grid-option.component.scss'],
})
export class GridOptionComponent implements OnInit, IOption<ITool> {
    Compass = Compass;
    tip: string;

    readonly directions = new Map<Compass, string>([
        [Compass.NW, 'North West'],
        [Compass.N, 'North'],
        [Compass.NE, 'North East'],
        [Compass.W, 'West'],
        [Compass.C, 'Center'],
        [Compass.E, 'East'],
        [Compass.SW, 'South West'],
        [Compass.S, 'South'],
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
        private gridService: GridService) {
    }

    ngOnInit() {
        this.opacity = 1;
        this.isMagnetOn = false;
        this.anchor = Compass.C;
        this.tip = 'Grid (G)';
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
        //
    }

    getImage(): string {
        const FILENAME = 'grid.png';
        return FILENAME;
    }

    toggleGrid(): void {
        this.gridService.toggleGrid();
    }

    toggleMagnet(): void {
        this.gridService.toggleMagnet();
        this.isMagnetOn = this.gridService.isMagnetOn;
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
}
