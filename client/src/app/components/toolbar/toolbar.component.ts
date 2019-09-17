<<<<<<< HEAD
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/services/tool/tool.service';
>>>>>>> aae1d58... Adding access methods to ToolService + creating a ToolService instance in ToolbarComponent

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

  private toolService: ToolService;

  currentDisplayedOption: OptionType;
  optionDisplayed: boolean;

  constructor() {
    this.toolService = new ToolService();

    this.currentDisplayedOption = OptionType.TOOL;
    this.optionDisplayed = false;
  }

  ngOnInit() {
  }



  chooseColor() {
    this.currentDisplayedOption = OptionType.COLOR;
    this.optionDisplayed = true;
  }

  chooseWorkingTool() {
    this.currentDisplayedOption = OptionType.TOOL;
    this.optionDisplayed = true;
  }

  chooseShape() {
    this.currentDisplayedOption = OptionType.SHAPE;
    this.optionDisplayed = true;
  }




  newDrawingOption() {

  }
  saveImage() {

  }
}
