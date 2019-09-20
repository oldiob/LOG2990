import { Component, Input, OnInit } from '@angular/core';
import { WorkZoneService } from './../../services/work-zone.service';
import { RectangleService } from '../../services/rectangle/rectangle.service';

@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
    @Input() keyEvent: KeyboardEvent;
    @Input() key: string;
    eventMouse: MouseEvent;
    height: number;
    width: number;
    rectangleWidth: number;
    rectangleHeight: number;
    rectangleActivate = false;
    backgroundColor: string;
    event: MouseEvent;
    mouseX = 0;
    mouseY = 0;
<<<<<<< HEAD
    rectangle: RectangleService;
    currentStyles: { height: number; width: number; 'background-color': string; };
    
    constructor(private workZoneService: WorkZoneService) { 
        this.eventMouse = new MouseEvent('mousedown');
        this.rectangle.initialX = 0;
        this.rectangle.initialY = 0;
        this.rectangle = new RectangleService(1, 1);
=======
    currentY = 0;
    currentX = 0;
    currentStyles: { height: number; width: number; 'background-color': string; };
    constructor(private workZoneService: WorkZoneService) {
<<<<<<< HEAD
        this.rectangleService = new RectangleService();
        this.rectangleService.click = false;
>>>>>>> Add Rectangle Interface And Rectangle Service
=======
>>>>>>> Add Draw Rectangle With MouseEvent
    }

    ngOnInit() {
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
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    }

<<<<<<< HEAD

    mouseLeftX:number;
    mouseRightX:number;
    mouseUpY:number;
    mouseLowerY:number;
    // @HostListener('window: mousedown', ['$event'])
=======
>>>>>>> Add Rectangle Interface And Rectangle Service
    onClick(event: MouseEvent): void {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    }
}
