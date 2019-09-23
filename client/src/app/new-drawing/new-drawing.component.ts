import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/services/dialog/dialog.service';
import { WorkZoneService } from '../../services/work-zone/work-zone.service';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
})
export class NewDrawingComponent implements OnInit {
  readonly IS_HIDDEN_WELCOME = 'false';
  readonly WELCOME_DIALOG_COOKIE = 'HideWelcomeDialog';
  readonly DEFAULT_BACKGROUND = '#FFFFFF';
  defaultWidth: number;
  defaultHeight: number;
  newDrawingFrom: FormGroup;

  private widthSubscription: Subscription;
  private heightSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private isOpenEntryDialog: boolean,
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private workZoneService: WorkZoneService) { }

  private createForm() {
    // Form to create new work zone to draw
    this.newDrawingFrom = this.formBuilder.group({
      height: [this.defaultHeight, Validators.min(0)],
      width: [this.defaultWidth, Validators.min(0)],
      backgroundColor: [this.DEFAULT_BACKGROUND],
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
  onWidthChange() {
    if (this.newDrawingFrom.controls.width.dirty) {
      this.widthSubscription.unsubscribe();
    }
  }

  onHeightChange() {
    if (this.newDrawingFrom.controls.height.dirty) {
      this.heightSubscription.unsubscribe();
    }
  }

  onSubmit() {
    const width = this.width;
    const height = this.height;
    const bgColor = this.backgroundColor;
    this.workZoneService.updateDrawAreaDimensions(width, height, bgColor);
  }

  chooseBgColor(bgColor: string) {
    this.newDrawingFrom.controls.backgroundColor.setValue(bgColor);
  }

  // Fetches default dimensions
  fetchDefaults() {
    this.widthSubscription = this.workZoneService.currentMaxWidth.subscribe((maxWidth) => {
      // Updates width form control
      this.newDrawingFrom.controls.width.setValue(maxWidth);
      this.defaultWidth = maxWidth;
    });

    this.heightSubscription = this.workZoneService.currentMaxHeight.subscribe((maxHeight) => {
      // Updates width form control
      this.newDrawingFrom.controls.height.setValue(maxHeight);
      this.defaultHeight = maxHeight;
    });
  }

  ngOnInit() {
    const IS_SHOW_WELCOME: boolean =
      (!sessionStorage.getItem(this.WELCOME_DIALOG_COOKIE) || sessionStorage.getItem(this.WELCOME_DIALOG_COOKIE) ===
        this.IS_HIDDEN_WELCOME) && this.isOpenEntryDialog;

    if (IS_SHOW_WELCOME) {
      this.dialogService.openEntryPoint(this.WELCOME_DIALOG_COOKIE);
    }
    this.createForm();
    this.fetchDefaults();
  }
}
