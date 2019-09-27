import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolService } from 'src/services/tool/tool.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
    @ViewChild('svgContainer', { static: true, read: ViewContainerRef }) entry: ViewContainerRef;
    @Input() keyEvent: KeyboardEvent;
    @Input() key: string;

    svgElements: string[];

    mouseX: number;
    mouseY: number;

    OFFSET = 50;
    height: number;
    width: number;

    rectangleWidth: number;
    rectangleHeight: number;
    rectangleActivate = false;
    backgroundColor: string = '#ffffffff';
    currentStyles: { height: number; width: number; 'background-color': string; };
    isMouseDown = false;
    isOnceWhileDown = true;

    constructor(
        private workZoneService: WorkZoneService,
        private svgService: SVGService,
        private toolService: ToolService) {
        //
    }

    ngOnInit() {
        this.svgService.entry = this.entry;
        // Subscribes to WorkZoneService observables
        this.workZoneService.currentWidth.subscribe(
            (width: number) => this.width = width
        );
        this.workZoneService.currentHeight.subscribe(
            (height): number => this.height = height
        );
        this.workZoneService.currentBackgroundColor.subscribe(
            (backgroundColor: string) => this.backgroundColor = backgroundColor
        );
    }
    setCurrentStyles() {
        return {
            height: `${this.height}px`,
            width: `${this.width}px`,
            'background-color': `${this.backgroundColor}`,
        };
    }
    coordinates(event: MouseEvent): void {
        this.mouseX = event.clientX - this.OFFSET;
        this.mouseY = event.clientY;
        if (this.isMouseDown && this.isMouseInArea()) {
            this.toolService.getCurrentTool().onMotion(event);
        }
    }

    onClick(event: MouseEvent): void {
        //
    }

    onMouseDown(event: MouseEvent): void {
        if (this.isOnceWhileDown && this.isMouseInArea()) {
            this.toolService.currentTool.onPressed(event);
            this.svgService.addObject(this.toolService.currentTool.element);
            this.isOnceWhileDown = false;
        }
        this.isMouseDown = true;
    }
    onMouseUp(): void {
        this.isMouseDown = false;
        this.isOnceWhileDown = true;
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
    isMouseInArea(): boolean {
        if (this.mouseX < this.width + this.OFFSET && this.mouseX >= this.OFFSET && this.mouseY >= 0 && this.mouseY < this.height) {
            return true;
        } else {
            this.isMouseDown = false;
            return false;
        }
    }
}
