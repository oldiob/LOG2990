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

  chooseColor() {
    alert("choosing color");
  }

  chooseWorkingTool() {
    alert("choosing tool");
  }


  chooseShape() {
    alert("choosing shape")
  }




  newDrawingOption() {
    alert("create new drawing");
  }
  
  saveImage() {
    alert("saving image")
  }



}
