import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

export enum OptionType {
  NONE = 0,
  COLOR = 1,
  TOOL = 2,
  SHAPE = 3,
};


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  currentOption: OptionType;

  constructor() {
    this.currentOption = OptionType.NONE;
  }

  ngOnInit() {
  }



  chooseColor() {
    this.currentOption = OptionType.COLOR;
  }

  chooseWorkingTool() {
    this.currentOption = OptionType.TOOL;
  }

  chooseShape() {
    this.currentOption = OptionType.SHAPE;
  }




  newDrawingOption() {

  }
  saveImage() {

  }
}
