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
    height: number;
    width: number;
    rectangleWidth: number;
    rectangleHeight: number;
    rectangleActivate = false;
    backgroundColor: string;
    currentStyles: { height: number; width: number; 'background-color': string; };
    constructor(private workZoneService: WorkZoneService) {
    }

    ngOnInit() {
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
            height: this.height ? this.height + 'px' : '0px',
            width: this.width ? this.width + 'px' : '0px',
            'background-color': this.backgroundColor ? this.backgroundColor : '#ffffff',
        };
    }
}
