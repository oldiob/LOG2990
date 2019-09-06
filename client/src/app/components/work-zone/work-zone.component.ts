import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-work-zone',
  templateUrl: './work-zone.component.html',
  styleUrls: ['./work-zone.component.scss']
})
export class WorkZoneComponent implements OnInit {
  @Input() keyEvent: KeyboardEvent;
  @Input() key: string;
  height: number;
  widget: number;
  backgroundColor: number;

  height: number;
  widget: number;
  backgroundColor: number;

  constructor() { }

  ngOnInit() {
  }

}
