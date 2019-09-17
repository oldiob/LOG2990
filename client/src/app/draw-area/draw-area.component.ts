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
    rectangle: RectangleService;
    currentStyles: { height: number; width: number; 'background-color': string; };
    
    constructor(private workZoneService: WorkZoneService) { 
        this.eventMouse = new MouseEvent('mousedown');
        this.rectangle.initialX = 0;
        this.rectangle.initialY = 0;
        this.rectangle = new RectangleService(1, 1);
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


    mouseLeftX:number;
    mouseRightX:number;
    mouseUpY:number;
    mouseLowerY:number;
    // @HostListener('window: mousedown', ['$event'])
    onClick(event: MouseEvent): void {
<<<<<<< HEAD
        this.rectangle.initialX=event.clientX;
        this.rectangle.initialY=event.clientY;
        while(this.eventMouse){
        this.rectangle.mouseX=event.clientX;
        this.rectangle.mouseY=event.clientY;
        this.rectangle.drawRectangle();
        this.mouseLeftX=this.rectangle.LeftX;
        this.mouseUpY=this.rectangle.upperY;
        //this.mouseX = event.clientX;
        //this.mouseY = event.clientY;
        this.rectangleHeight = this.rectangle.heightRectangle;
        this.rectangleWidth = this.rectangle.widthRectangle;
        this.rectangleActivate = true;
        }
=======
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.rectangleHeight = this.mouseY;
        this.rectangleWidth = this.mouseX;
        this.rectangleActivate = true;
>>>>>>> Add Svg Rectangle Width And Height
    }
}
