import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CmdInterface, CmdService } from 'src/services/cmd/cmd.service';
import { GridService } from 'src/services/grid/grid.service';
import { SVGService } from 'src/services/svg/svg.service';
import { EraserTool } from 'src/services/tool/tool-options/eraser';
import { ToolService } from 'src/services/tool/tool.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { DOMRenderer } from 'src/utils/dom-renderer';

@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {

    @ViewChild('svgContainer', { static: true, })
    svg: ElementRef;

    @ViewChild('gridContainer', { static: true })
    grid: ElementRef;

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

    currentCursor: string;
    oldTool: object;

    isMouseDown = false;
    isOnceWhileDown = true;
    constructor(
        private workZoneService: WorkZoneService,
        private svgService: SVGService,
        private toolService: ToolService,
        private gridService: GridService) {

        this.currentCursor = 'crosshair';
        this.oldTool = Object.getPrototypeOf(this.toolService.currentTool);
    }

    ngOnInit() {
        this.svgService.entry = this.svg;
        this.gridService.ref = this.grid;

        // Subscribes to WorkZoneService observables
        this.workZoneService.currentWidth.subscribe(
            (width: number) => {
                this.width = width;
                this.gridService.width = this.width;

                return width;
            },
        );
        this.workZoneService.currentHeight.subscribe(
            (height): number => {
                this.height = height;
                this.gridService.height = this.height;

                return height;
            },

        );
        this.workZoneService.currentBackgroundColor.subscribe(
            (backgroundColor: string) => this.backgroundColor = backgroundColor,
        );

        this.gridService.width = this.width;
        this.gridService.height = this.height;
        this.svgService.clearObjects();
    }

    setCurrentStyles() {
        const currentHeigth = `${this.height}`;
        const currentWidth = `${this.width}`;

        DOMRenderer.setAttribute(this.svg.nativeElement, 'height', currentHeigth);
        DOMRenderer.setAttribute(this.svg.nativeElement, 'width', currentWidth);

        const newTool = Object.getPrototypeOf(this.toolService.currentTool);

        if (this.oldTool !== newTool) {
            if (newTool === EraserTool.prototype) {
                const radius = this.toolService.currentTool.width;
                if (radius) {
                    this.currentCursor = `url(./../assets/cursors/circle-${2 * radius}.png) ${radius} ${radius}, auto`;
                }
            } else {
                this.currentCursor = 'crosshair';
            }
        }

        this.oldTool = newTool;

        return {
            height: currentHeigth + 'px',
            width: currentWidth + 'px',
            'background-color': `${this.backgroundColor}`,
            cursor: this.currentCursor,
        };
    }

    gridStyle() {
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
        this.toolService.currentTool.onMotion(event);
        event.stopPropagation();
    }

    onDoubleClick(event: MouseEvent): void {
        event.doubleClick = true;
        this.onMouseUp(event);
    }

    onMouseDown(event: MouseEvent): void {
        const rect = this.svg.nativeElement.getBoundingClientRect();
        event.svgX = event.clientX - rect.left;
        event.svgY = event.clientY - rect.top;
        const cmd: CmdInterface | null = this.toolService.currentTool.onPressed(event);
        CmdService.execute(cmd);
        event.stopPropagation();
    }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: MouseEvent): void {
        const rect = this.svg.nativeElement.getBoundingClientRect();
        event.svgX = event.clientX - rect.left;
        event.svgY = event.clientY - rect.top;
        this.toolService.currentTool.onReleased(event);
        event.stopPropagation();
    }

    onMouseEnter(): void {
        //
    }
    onMouseLeave(event: MouseEvent): void {
        //
    }
    onDrag(): void {
        //
    }

    @HostListener('window:keydown', ['$event'])
    onKeyPressed(event: KeyboardEvent): void {
        if (this.toolService.currentTool.onKeydown) {
            if (this.toolService.currentTool.onKeydown(event)) {
                event.preventDefault();
            }
        }
    }

    @HostListener('window:keyup', ['$event'])
    onKeyReleased(event: KeyboardEvent): void {
        if (this.toolService.currentTool.onKeyup) {
            this.toolService.currentTool.onKeyup(event);
        }
    }

    onWheel(event: WheelEvent): void {
        if (this.toolService.currentTool.onWheel) {
            this.toolService.currentTool.onWheel(event);
        }
    }
}
