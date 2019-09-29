import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolService } from 'src/services/tool/tool.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

declare type callback = () => void;

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
    onMouseMove(event: MouseEvent): void {
        const rect = this.entry.nativeElement.getBoundingClientRect();
        event.svgX = event.clientX - rect.left;
        event.svgY = event.clientY - rect.top;
        if (this.isMouseDown) {
            this.toolService.currentTool.onMotion(event);
        }
    }

    onClick(event: MouseEvent): void { }

    onMouseDown(event: MouseEvent): void {
        const rect = this.entry.nativeElement.getBoundingClientRect();
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
        this.isNewDrawCreate = true;
    }
    onMouseLeave(): void {
        //
    }
    onDrag(): void {
        //
    }

    @HostListener('window: keypress', ['$event'])
    @HostListener('window: keydown', ['$event'])
    pressKeyboard(event: KeyboardEvent): void {
        const kbd: { [id: string]: callback } = {
            'C-s': () => { console.log("TODO - Remove me"); }
        };
        let keys: string = "";
        if (event.ctrlKey) {
            keys += "C-";
        }
        keys += event.key;
        if (kbd[keys]) {
            let func: callback = kbd[keys];
            func();
        }
    }
}
