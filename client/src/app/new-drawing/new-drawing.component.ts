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
  readonly DEFAULT_BACKGROUND_HEX = '#FFFFFF';

  readonly DEFAULT_RED = 0;
  readonly DEFAULT_GREEN = 0;
  readonly DEFAULT_BLUE = 0;
  readonly DEFAULT_OPACITY = 0;

  defaultWidth: number;
  defaultHeight: number;
  rgba: RGBA;
  newDrawingFrom: FormGroup;

  private widthSubscription: Subscription;
  private heightSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private isOpenEntryDialog: boolean,
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private workZoneService: WorkZoneService) { }

  private createForm() {
    const rgbaValidators = [Validators.min(0), Validators.max(255)];
    // Form to create new work zone to draw
    this.newDrawingFrom = this.formBuilder.group({
      height: [this.defaultHeight, Validators.min(0)],
      width: [this.defaultWidth, Validators.min(0)],
      backgroundColor: [this.DEFAULT_BACKGROUND_HEX, Validators.min(0)],
      red: [this.DEFAULT_RED, rgbaValidators],
      green: [this.DEFAULT_GREEN, rgbaValidators],
      blue: [this.DEFAULT_BLUE, rgbaValidators],
      opacity: [this.DEFAULT_OPACITY, rgbaValidators],
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
  get red() {
    return this.newDrawingFrom.controls.red.value;
  }
  get green() {
    return this.newDrawingFrom.controls.green.value;
  }
  get blue() {
    return this.newDrawingFrom.controls.blue.value;
  }
  get opacity() {
    return this.newDrawingFrom.controls.opacity.value;
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

  onColorRGBAChange() {
    this.updateColorHEX();
  }
  onColorHEXChange() {
    this.updateColorRGBA();
  }

  onSubmit() {
    const width = this.width;
    const height = this.height;
    const bgColor = this.backgroundColor;
    this.workZoneService.updateDrawAreaDimensions(width, height, bgColor);
  }

  chooseBgColor(bgColor: string) {
    this.newDrawingFrom.controls.backgroundColor.setValue(bgColor);
    this.updateColorRGBA();
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

  private convertToHEX(rgb: number): string {
    let hexString = rgb.toString(16).toUpperCase();
    if (hexString.length < 2) {
      hexString = '0' + hexString;
    }
    return hexString;
  }

  private convertToDecimal(hex: string): number {
    return parseInt(hex, 16);
  }

  updateColorRGBA() {
    const RED = this.convertToDecimal(this.backgroundColor.substring(1, 3));
    const GREEN = this.convertToDecimal(this.backgroundColor.substring(3, 5));
    const BLUE = this.convertToDecimal(this.backgroundColor.substring(5, 7));

    this.newDrawingFrom.controls.red.setValue(RED);
    this.newDrawingFrom.controls.green.setValue(GREEN);
    this.newDrawingFrom.controls.blue.setValue(BLUE);
  }

  updateColorHEX() {
    const COLOR_HEX =
      '#' + this.convertToHEX(this.red) + this.convertToHEX(this.green) + this.convertToHEX(this.blue);

    this.newDrawingFrom.controls.backgroundColor.setValue(COLOR_HEX);
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
    this.updateColorRGBA();
  }
}
