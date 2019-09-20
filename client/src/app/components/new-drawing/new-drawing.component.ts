import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WorkZoneService } from './../../services/work-zone.service';
@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
})
export class NewDrawingComponent implements OnInit {
  defaultWidth: number;
  defaultHeight: number;
  defaultBackgroundColor = '#F9F9F9';
  newDrawingFrom: FormGroup;
  @Output() displayChange = new EventEmitter<boolean>();
  displayNewDrawing: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private workZoneService: WorkZoneService) {
    this.defaultWidth = 0;
    this.defaultWidth = 0;
    this.defaultBackgroundColor = '#F9F9F9';
    this.displayNewDrawing = true;
    this.createForm();
  }

  private createForm() {
    // Form to create new work zone to draw
    this.newDrawingFrom = this.formBuilder.group({
      height: [this.defaultHeight, Validators.min(0)],
      width: [this.defaultWidth, Validators.min(0)],
      backgroundColor: ['#ffffff'],
    });
  }

  get width() {
    return this.newDrawingFrom.controls.width.value;
  }
  get height() {
    return this.newDrawingFrom.controls.height.value;
  }
  get backgroundColor() {
    return this.newDrawingFrom.controls.backgroundColor.value;
  }

  onSubmit() {
    const width = this.width;
    const height = this.height;
    const bgColor = this.backgroundColor;
    this.workZoneService.updateDrawAreaDimensions(width, height, bgColor);
    this.displayNewDrawing = false;
    this.displayChange.emit(this.displayNewDrawing);
  }

  chooseBgColor(bgColor: string) {
    this.newDrawingFrom.controls.backgroundColor.setValue(bgColor);
  }

  // Fetches default dimensions
  private fetchDefaults() {
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
    this.fetchDefaults();
  }
}
