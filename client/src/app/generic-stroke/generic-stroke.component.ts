import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-stroke',
  templateUrl: './generic-stroke.component.html',
  styleUrls: ['./generic-stroke.component.scss'],
})
export class GenericStrokeComponent implements OnInit {
  @Input() points: string;
  viewBoxSetting: string;
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
  }
  setViewBoxSetting() {
    this.viewBoxSetting = '0 0 ' + screen.width + ' ' + screen.height;
  }
}
