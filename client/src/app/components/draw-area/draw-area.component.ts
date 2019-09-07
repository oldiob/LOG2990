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

  event: MouseEvent;
  mouseX = 0;
  mouseY = 0;

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
  coordinates(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    console.log(this.mouseX + ' ' + this.mouseY);
}
  onClick(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    console.log(this.mouseX + ' ' + this.mouseY + ' Clicked');
  }

}
