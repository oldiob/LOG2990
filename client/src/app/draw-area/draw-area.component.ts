import { Component, Input, OnInit } from '@angular/core';
import { WorkZoneService } from 'src/services/work-zone.service';

@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
    @Input() keyEvent: KeyboardEvent;
    @Input() key: string;
    height: number = 0;
    width: number = 0;
    rectangleWidth: number;
    rectangleHeight: number;
    rectangleActivate = false;
    backgroundColor: string = "#ffffffff";
    currentStyles: { height: number; width: number; 'background-color': string; };
    constructor(private workZoneService: WorkZoneService) {
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
<<<<<<< HEAD:client/src/app/draw-area/draw-area.component.ts
=======
    coordinates(event: MouseEvent): void {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    }

    onClick(event: MouseEvent): void {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.rectangleHeight = this.mouseY;
        this.rectangleWidth = this.mouseX;
        this.rectangleActivate = true;
    }
>>>>>>> Add Svg Rectangle Width And Height:client/src/app/components/draw-area/draw-area.component.ts
}
