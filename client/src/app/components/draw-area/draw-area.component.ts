import {Component, Input, OnInit} from '@angular/core';
import {WorkZoneService} from './../../services/work-zone.service';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
  height: number;
  width: number;
  backgroundColor: string;
  @Input() keyEvent: KeyboardEvent;
  @Input() key: string;

  event: MouseEvent;
  mouseX = 0;
  mouseY = 0;

  constructor(private workZoneService: WorkZoneService) {
    this.workZoneService.getCurrentHeight().subscribe((currHeight: number) => {
      this.height = currHeight;
    });
    this.workZoneService.currentWidth.subscribe((currWidth: number) => {
      this.width = currWidth;
    });
    this.workZoneService.currentBackgroundColor.subscribe((currBackgroundColor: string) => {
      this.backgroundColor = currBackgroundColor; //not working, tried multiple solutions...
    });
  }

  ngOnInit() {}

  coordinates(event: MouseEvent): void {  // will convert this into service
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
  onClick(event: MouseEvent): void {  // will convert this into service
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
}
