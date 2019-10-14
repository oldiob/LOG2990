import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SVGService } from 'src/services/svg/svg.service';
import { GridService } from 'src/services/grid/grid.service';
import { ToolService } from 'src/services/tool/tool.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
    @ViewChild('svgContainer', { static: true })
    svg: ElementRef;

    @ViewChild('gridContainer', { static: true })
    grid: ElementRef;

    @Input()
    keyEvent: KeyboardEvent;

    @Input()
    key: string;

    svgElements: string[];

    mouseX: number;
    mouseY: number;

    height: number;
    width: number;
    backgroundColor = '#ffffffff';
    currentStyles: {
        height: string; width: string;
        'background-color': string;
        cursor: string
    };
    isMouseDown = false;
    isOnceWhileDown = true;
    constructor(
        private workZoneService: WorkZoneService,
        private svgService: SVGService,
        private toolService: ToolService,
        private gridService: GridService) {
    }

    ngOnInit() {
        this.svgService.entry = this.svg;
        this.gridService.ref = this.grid;
        // Subscribes to WorkZoneService observables
        this.workZoneService.currentWidth.subscribe(
            (width: number) => this.width = width,
        );
        this.workZoneService.currentHeight.subscribe(
            (height): number => this.height = height,
        );
        this.workZoneService.currentBackgroundColor.subscribe(
            (backgroundColor: string) => this.backgroundColor = backgroundColor,
        );

        this.svgService.clearDrawArea();
    }
    setCurrentStyles() {
        return {
            height: `${this.height}px`,
            width: `${this.width}px`,
            'background-color': `${this.backgroundColor}`,
        };
    }
    gridStyle() {
        this.gridService.draw(this.width, this.height);
        return {
            height: `${this.height}px`,
            width: `${this.width}px`,
            position: 'absolute',
            'pointer-events': 'none',
        };
    }
    onMouseMove(event: MouseEvent): void {
        const rect = this.svg.nativeElement.getBoundingClientRect();
        event.svgX = event.clientX - rect.left;
        event.svgY = event.clientY - rect.top;
        if (this.isMouseDown) {
            this.toolService.currentTool.onMotion(event);
        }
    }

    onClick(event: MouseEvent): void {
        //
    }

    onMouseDown(event: MouseEvent): void {
        const rect = this.svg.nativeElement.getBoundingClientRect();
        event.svgX = event.clientX - rect.left;
        event.svgY = event.clientY - rect.top;
        if (this.isOnceWhileDown) {
            this.svgService.addObject(this.toolService.currentTool.onPressed(event));
            this.isOnceWhileDown = false;
        }
        this.isMouseDown = true;
    }
    onMouseUp(event: MouseEvent): void {
        this.isMouseDown = false;
        this.isOnceWhileDown = true;
        this.toolService.currentTool.onReleased(event);
    }
    onMouseEnter(): void {
        //
    }
    onMouseLeave(): void {
        //
    }
    onDrag(): void {
        //
    }
}
