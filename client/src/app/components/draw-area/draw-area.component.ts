import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss']
})
export class DrawAreaComponent implements OnInit {
  @Input() height: number;
  @Input() widget: number;
  @Input() backgroundColor: number;

  constructor() { }

  ngOnInit() {


  }
  setParameter() {
    let styles = {
      'background-color': this.backgroundColor,
      width: this.widget,
      height: this.height,
    };
    return styles;
  }

  setParameter() {
    let styles = {
      'background-color': this.backgroundColor,
      width: this.widget,
      height: this.height,
    };
    return styles;
  }
  coordinates(event: MouseEvent): void { // will convert this into service
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
  onClick(event: MouseEvent): void { // will convert this into service
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
}
