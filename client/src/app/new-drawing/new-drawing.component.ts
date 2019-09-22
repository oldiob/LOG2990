import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EntryPointComponent } from '../entry-point/entry-point.component';
import {WorkZoneService} from 'src/services/work-zone.service';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
})
export class NewDrawingComponent implements OnInit {
  FALSE = 'false';
  RESULT = 'result';
  DEFAULTBACKGROUND = '#ffffff';
  defaultBGColor = '#F9F9F9';
  defaultWidth: number;
  defaultHeight: number;
  newDrawingFrom: FormGroup;
  @Output() displayChange = new EventEmitter<boolean>();
  displayNewDrawing: boolean;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private workZoneService: WorkZoneService) {
    }

  private createForm() {
    // Form to create new work zone to draw
    this.newDrawingFrom = this.formBuilder.group({
      height: [this.defaultHeight, Validators.min(0)],
      width: [this.defaultWidth, Validators.min(0)],
      backgroundColor: [this.DEFAULTBACKGROUND],
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

  // open entry point dialog
  openEntryDialog(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(EntryPointComponent, dialogConfig).afterClosed().subscribe((result: boolean) => {
      sessionStorage.setItem(this.RESULT, JSON.stringify(result));
    });
  }

  ngOnInit() {
    if (!sessionStorage.getItem(this.RESULT) || sessionStorage.getItem(this.RESULT) === this.FALSE ) {
      this.openEntryDialog();
    }
    this.createForm();
    this.fetchDefaults();
  }
}
