import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-stroke',
  templateUrl: './generic-stroke.component.html',
  styleUrls: ['./generic-stroke.component.scss'],
})
export class GenericStrokeComponent implements OnInit {
  @Input() points: string;
  viewBoxSetting: string;
  color = 'black';
  strokeWidth = 2;
  constructor() {
    //
   }

  ngOnInit() {
    //
  }
  addPoints(posX: number, posY: number) {
    this.points += ' ' + (posX) + ',' + posY;
  }
  iniPoints(posX: number, posY: number) {
    this.points = ' ' + posX + ',' + posY;
    this.points += ' ' + (posX+1) + ',' + (posY+1);
  }
  setViewBoxSetting() {
    //this.viewBoxSetting = '0 0 ' + screen.width + ' ' + screen.height;
    this.viewBoxSetting = '0 0 ' + window.innerWidth + ' ' + window.innerHeight;
  }
  setColor(targetColor: string) {
    this.color = targetColor;
  }
  setStrokeWidth(targetWidth: number) {
    this.strokeWidth = targetWidth;
  }
}
