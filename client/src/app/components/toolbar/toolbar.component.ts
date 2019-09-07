import { Component, OnInit } from '@angular/core';
import { ToolbarOptionComponent } from './toolbar-option/toolbar-option.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  currentToolbarOption: ToolbarOptionComponent

  constructor() { }

  ngOnInit() {
  }

  chooseWorkingTool() {
    alert("choosing tool");
  }

  newDrawingOption() {
    alert("create new drawing");
  }
}
