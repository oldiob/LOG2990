import {Component, Input, OnInit} from '@angular/core';
import {WorkZoneService} from './../../services/work-zone.service';

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
  backgroundColor: string;
  event: MouseEvent;
  mouseX = 0;
  mouseY = 0;
  currentStyles: {height: number; width: number; 'backgroud-color': string;};

  constructor(private workZoneService: WorkZoneService) {}

  ngOnInit() {
    // Subscribes to WorkZoneService observables
    this.workZoneService.currentWidth.subscribe(
        (width: number) => this.width = width);
    this.workZoneService.currentHeight.subscribe(
        (height): number => this.height = height);
    this.workZoneService.currentBackgroundColor.subscribe(
        (backgroundColor: string) => this.backgroundColor = backgroundColor);
    console.log(this.backgroundColor);
  }

  setCurrentStyles() {
    return {
      height: this.height ? this.height + 'px' : '0px',
      width: this.width ? this.width + 'px' : '0px',
      'background-color': this.backgroundColor ? this.backgroundColor : '#ffffff',
    };
  }

  coordinates(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
  onClick(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
}
