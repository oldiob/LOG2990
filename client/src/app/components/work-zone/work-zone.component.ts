import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-zone',
  templateUrl: './work-zone.component.html',
  styleUrls: ['./work-zone.component.scss']
})
export class WorkZoneComponent implements OnInit {

  height: number;
  widget: number;
  backgroundColor: number;

  constructor() { }

  ngOnInit() {
  }

}
