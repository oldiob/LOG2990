import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { GridService } from 'src/services/grid/grid.service';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolService } from 'src/services/tool/tool.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
    MAX_ANGLE = 360;
    MIN_ANGLE = 0;
    MULTI_15 = 15;
    DEGREE = 1;

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
        this.svgService.addObject(this.toolService.currentTool.onPressed(event));
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
            this.toolService.currentTool.onKeydown(event);
        }
    }

    @HostListener('window:keyup', ['$event'])
    onKeyReleased(event: KeyboardEvent): void {
        if (this.toolService.currentTool.onKeyup) {
            if (this.toolService.currentTool.onKeyup(event)) {
                return;
            }
        }
    }
    onWheel(event: WheelEvent): void {
      const changeAngle = event.altKey ? this.DEGREE : this.DEGREE * this.MULTI_15;
      if (this.toolService.currentTool.angle !== null) {
      if (event.deltaY < this.MIN_ANGLE && this.toolService.currentTool.angle - changeAngle >= this.MIN_ANGLE) {
          this.toolService.currentTool.angle -= changeAngle;
      } else if (event.deltaY > this.MIN_ANGLE && this.toolService.currentTool.angle + changeAngle <= this.MAX_ANGLE) {
          this.toolService.currentTool.angle += changeAngle;
      }
    }
}
}
