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

}
