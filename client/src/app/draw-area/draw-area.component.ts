import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolService } from 'src/services/tool/tool.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
    @ViewChild('svgContainer', { static: true })
    entry: ElementRef;

    @Input()
    keyEvent: KeyboardEvent;

    @Input()
    key: string;

    svgElements: string[];

    mouseX: number;
    mouseY: number;

    OFFSET = 50;
    height: number;
    width: number;
    isNewDrawCreate: boolean;
    rectangleWidth: number;
    rectangleHeight: number;
    rectangleActivate = false;
    backgroundColor = '#ffffffff';
    currentStyles: { height: number; width: number; 'background-color': string; };
    isMouseDown = false;
    isOnceWhileDown = true;
    constructor(
        private workZoneService: WorkZoneService,
        private svgService: SVGService,
        private toolService: ToolService) {
        this.isNewDrawCreate = false;
    }

    ngOnInit() {
        this.svgService.entry = this.entry;
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
            this.toolService.currentTool.onMotion(this.mouseX, this.mouseY);
        }
    }

    onClick(event: MouseEvent): void {
        //
    }

    onMouseDown(event: MouseEvent): void {
        const x = event.clientX - this.OFFSET;
        const y = event.clientY;

        if (this.isOnceWhileDown && this.isMouseInArea()) {
            this.toolService.currentTool.onPressed(x, y);
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
        this.isNewDrawCreate = true;
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
    @HostListener('window: keypress', ['$event'])
    @HostListener('window: keydown', ['$event'])
    pressKeyboard(event: KeyboardEvent): void {
        if (this.isNewDrawCreate) {
            switch (event.key) {
                // crayon
                case 'c' :
                    this.toolService.setCurrentToolIndex(0);
                    break;
                // pinceau
                case 'w' :
                    this.toolService.setCurrentToolIndex(1);
                    break;
                // seau de couleur
                case 'b' :
                    this.toolService.setCurrentToolIndex(2);
                    break;
                // rectangle
                case '1' :
                    this.toolService.setCurrentToolIndex(3);
                    break;
                // new draw
                case 'event.ctrl && c' :
                    console.log('ctrl + c');
                    break;
                // save
                // case 'ctrlkey' :
                //     console.log('ctrl + s');
                //     break;
                default:
                    break;
            }
        }
    }
}
