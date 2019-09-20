import { Component, Input, OnInit } from '@angular/core';
import { WorkZoneService } from './../../services/work-zone.service';

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
    currentY = 0;
    currentX = 0;
    currentStyles: { height: number; width: number; 'background-color': string; };
    constructor(private workZoneService: WorkZoneService) {
<<<<<<< HEAD
<<<<<<< HEAD
        this.rectangleService = new RectangleService();
        this.rectangleService.click = false;
>>>>>>> Add Rectangle Interface And Rectangle Service
=======
>>>>>>> Add Draw Rectangle With MouseEvent
=======
>>>>>>> Fix rectangle-service.ts in order for rectangles to be draw in any directions
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
<<<<<<< HEAD

    mouseLeftX:number;
    mouseRightX:number;
    mouseUpY:number;
    mouseLowerY:number;
    // @HostListener('window: mousedown', ['$event'])
=======
>>>>>>> Add Rectangle Interface And Rectangle Service
=======
>>>>>>> Fix rectangle-service.ts in order for rectangles to be draw in any directions
    onClick(event: MouseEvent): void {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    }
}
