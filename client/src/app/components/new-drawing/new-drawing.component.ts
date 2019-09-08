import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
})
export class NewDrawingComponent implements OnInit {
  colorSelected = false;

  defaultWidth = 1920;
  defaultHeight = 1080;
  newDrawingFrom = this.formBuidler.group({
    width: [this.defaultWidth],
    height: [this.defaultHeight],
    backgroundColor: ['#fff'],
  });

  constructor(private formBuidler: FormBuilder) {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.newDrawingFrom.value);
  }

  chooseBgColor(bgColor: string) {
    this.newDrawingFrom.controls.backgroundColor.setValue(bgColor);
    this.colorSelected = true;
  }

  ngOnInit() {}
}
