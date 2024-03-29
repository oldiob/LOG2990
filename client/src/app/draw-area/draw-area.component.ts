import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CmdInterface, CmdService } from 'src/services/cmd/cmd.service';
import { GridService } from 'src/services/grid/grid.service';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolService } from 'src/services/tool/tool.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { ShowcaseSignal } from 'src/utils/showcase-signal';

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

    private height: number;
    private width: number;
    private backgroundColor: Color;

    constructor(
        private workZoneService: WorkZoneService,
        private svgService: SVGService,
        private toolService: ToolService,
        private gridService: GridService) {
    }

    ngOnInit() {
        this.svgService.entry = this.svg;
        this.gridService.ref = this.grid;

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
            (backgroundColor: Color) => this.backgroundColor = backgroundColor,
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

        return {
            height: currentHeigth + 'px',
            width: currentWidth + 'px',
            'background-color': `${this.backgroundColor.toRGBA()}`,
            cursor: this.svgService.cursor,
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

    @HostListener('window:wheel', ['$event'])
    onMouseWheel(event: WheelEvent): void {
        const rect = this.svg.nativeElement.getBoundingClientRect();
        event.svgX = event.clientX - rect.left;
        event.svgY = event.clientY - rect.top;
        if (this.toolService.currentTool.onWheel) {
            if (this.toolService.currentTool.onWheel(event)) {
                event.preventDefault();
                ShowcaseSignal.emit();
            }
        }
    }

    onMouseEnter(): void {
        //
    }
    onMouseLeave(event: MouseEvent): void {
        if (this.toolService.currentTool.onLeave) {
            this.toolService.currentTool.onLeave();
        }
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
            if (this.toolService.currentTool.onWheel(event)) {
                event.preventDefault();
            }
        }
    }
}
