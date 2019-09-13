import { Component, OnInit } from '@angular/core';
import { SelectorComponent } from './selector/selector.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  currentToolbarOption: SelectorComponent;

  optionBarShowing: boolean;

  constructor() {
    this.optionBarShowing = false;
  }

  ngOnInit() {
  }

  showOptionBar() {
    this.optionBarShowing = !this.optionBarShowing;
  }

  // TODO: add "hideOptionBar" that's called when clicking on the same button

  chooseColor() {
    this.showOptionBar();
  }

  chooseWorkingTool() {
    this.showOptionBar();
  }

  chooseShape() {
    this.showOptionBar();
  }

  newDrawingOption() {
    this.showOptionBar();
  }

  saveImage() {
    this.showOptionBar();
  }

}
