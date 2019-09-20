import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-stroke',
  templateUrl: './generic-stroke.component.html',
  styleUrls: ['./generic-stroke.component.scss'],
})
export class GenericStrokeComponent implements OnInit {
  @Input() points: string = '0,0';

  constructor() {
    //
   }

  ngOnInit() {
    //
  }
  alert() {
    alert('yeet');
  }
  addPoints(posX: number, posY: number) {
    console.log(posX+" and "+posY+" added");
    this.points += ' ' + posX + ',' + posY;
  }
  changePoints() {
    this.points = '100,100 150,25 150,75 200,0';
  }

}
