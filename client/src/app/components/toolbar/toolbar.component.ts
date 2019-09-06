import { Component, OnInit } from '@angular/core';
import { SelectorComponent } from './selector/selector.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  currentToolbarOption: SelectorComponent;

  optionBarShowing: boolean;

  constructor() {
    this.optionBarShowing = false;
  }

  ngOnInit() {
  }

  chooseWorkingToolOption() {
    console.log("choosing tool")
  }
}
