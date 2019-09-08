import { Component, OnInit } from '@angular/core';
import { ToolbarOptionComponent } from './toolbar-option/toolbar-option.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  currentToolbarOption: ToolbarOptionComponent;

  optionBarShowing: boolean;

  constructor() { 
    this.optionBarShowing = false;
  }

  ngOnInit() {
  }


  showOptionBar() {
    this.optionBarShowing = !this.optionBarShowing;
  }


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
