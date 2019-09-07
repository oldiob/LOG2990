import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dev-panel',
  templateUrl: './dev-panel.component.html',
  styleUrls: ['./dev-panel.component.scss']
})
export class DevPanelComponent implements OnInit {
  @Input() mouseX: number;
  @Input() mouseY: number;

  constructor() { }

  ngOnInit() {
  }

}
