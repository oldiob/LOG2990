import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-drawing',
  templateUrl: './load-drawing.component.html',
  styleUrls: ['./load-drawing.component.scss'],
})
export class LoadDrawingComponent implements OnInit {

  content: string;
  constructor() {
    //
  }

  isDone = false;

  ngOnInit() {
    //
  }

  done() {
    this.isDone = true;
  }

}
