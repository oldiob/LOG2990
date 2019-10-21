import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-load-drawing',
  templateUrl: './load-drawing.component.html',
  styleUrls: ['./load-drawing.component.scss'],
})
export class LoadDrawingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  isDone = false;

  ngOnInit() {
    //
  }

  done() {
    this.isDone = true;
  }
  onClose() {
    //
  }

}
