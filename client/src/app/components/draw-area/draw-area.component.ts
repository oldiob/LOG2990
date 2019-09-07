import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  @Input() backgroundColor: number;
  @Input() keyEvent: KeyboardEvent;
  @Input() key: string;

  event: MouseEvent;
  mouseX = 0;
  mouseY = 0;
  key: string;
  @Input() keyEvent: KeyboardEvent;

  constructor() {}

  ngOnInit() {}

  setParameter() {
    const styles = {
      'background-color': this.backgroundColor,
      width: this.width,
      height: this.height,
    };
    return styles;
  }
  coordinates(event: MouseEvent): void { // will convert this into service
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    console.log(this.mouseX + ' ' + this.mouseY);
  }
  onClick(event: MouseEvent): void { // will convert this into service
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
}
