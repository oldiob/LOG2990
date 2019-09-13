import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WorkZoneService} from './../../services/work-zone.service';
@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
})
export class NewDrawingComponent implements OnInit {
  defaultWidth: number;
  defaultHeight: number;

  width: number;
  height: number;
  backgroundColor = '#F9F9F9';

  newDrawingFrom: FormGroup;
  @Output() displayChange = new EventEmitter<boolean>();
  displayNewDrawing = true;

  constructor(
      private formBuidler: FormBuilder,
      private workZoneService: WorkZoneService) {}

  createForm() {
    // Form to create new work zone to draw
    this.newDrawingFrom = this.formBuidler.group({
      height: [this.defaultHeight],
      width: [this.defaultWidth],
      backgroundColor: ['#ffffff'],
    });
  }

  // for testing
  onSubmit() {
    console.warn(this.newDrawingFrom.controls.width.value);
    console.warn(this.newDrawingFrom.controls.height.value);
    console.warn(this.newDrawingFrom.controls.backgroundColor.value);

    const width = this.newDrawingFrom.controls.width.value;
    const height = this.newDrawingFrom.controls.height.value;
    const bgColor = this.newDrawingFrom.controls.backgroundColor.value;

    this.workZoneService.updateDrawAreaDimensions(width, height, bgColor);
    this.displayNewDrawing = false;
    this.displayChange.emit(this.displayNewDrawing);
  }

  chooseBgColor(bgColor: string) {
    this.newDrawingFrom.controls.backgroundColor.setValue(bgColor);
    this.backgroundColor = bgColor;
  }

  // Fetches default dimensions
  fetchDefaults() {
    this.workZoneService.currentMaxWidth.subscribe((maxWidth) => {
      // Updates width form control
      this.newDrawingFrom.controls.width.setValue(maxWidth);
      // Updates width view form
      this.defaultWidth = maxWidth;
    });

    this.workZoneService.currentMaxHeight.subscribe((maxHeight) => {
      // Updates width form control
      this.newDrawingFrom.controls.height.setValue(maxHeight);
      // Updates height view form
      this.defaultHeight = maxHeight;
    });
  }

  ngOnInit() {
    this.createForm();
    this.fetchDefaults();
  }
}
