import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/services/dialog/dialog.service';
import { WorkZoneService } from '../../services/work-zone/work-zone.service';
import { DrawAreaService } from './../../services/draw-area/draw-area.service';

@Component({
  selector: 'app-new-drawing',
  templateUrl: './new-drawing.component.html',
  styleUrls: ['./new-drawing.component.scss'],
})
export class NewDrawingComponent implements OnInit {
  readonly DEFAULT_BACKGROUND_HEX = '#FFFFFF';

  readonly DEFAULT_RED = 255;
  readonly DEFAULT_GREEN = 255;
  readonly DEFAULT_BLUE = 255;
  readonly DEFAULT_OPACITY = 1;

  isSaveDrawing: boolean;
  displaySaveError: boolean;

  defaultWidth: number;
  defaultHeight: number;
  rgba: RGBA;
  newDrawingFrom: FormGroup;

  private widthSubscription: Subscription;
  private heightSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialgoInfo: { entryPoint: boolean; saveStatus: boolean; },
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private workZoneService: WorkZoneService,
    private drawAreaService: DrawAreaService) {
    this.displaySaveError = false;
  }

  ngOnInit() {
    this.isSaveDrawing = this.dialgoInfo.saveStatus;
    this.createForm();
    this.fetchDefaults();
    this.updateColorRGBA();
  }

  private createForm() {
    const DEFAULT_BACKGROUND_RGBA =
      this.formatToRGBA({
        red: this.DEFAULT_RED,
        green: this.DEFAULT_GREEN,
        blue: this.DEFAULT_BLUE,
        opacity: this.DEFAULT_OPACITY,
      });

    // Form to create new work zone to draw
    const rgbaValidators = [Validators.min(0), Validators.max(255)];
    const dimentionsValidators = [Validators.min(0), Validators.required];

    this.newDrawingFrom = this.formBuilder.group({
      height: [this.defaultHeight, dimentionsValidators],
      width: [this.defaultWidth, dimentionsValidators],

      backgroundColor: [DEFAULT_BACKGROUND_RGBA],
      backgroundColorHEX: [this.DEFAULT_BACKGROUND_HEX],

      red: [this.DEFAULT_RED, rgbaValidators],
      green: [this.DEFAULT_GREEN, rgbaValidators],
      blue: [this.DEFAULT_BLUE, rgbaValidators],
      opacity: [this.DEFAULT_OPACITY, rgbaValidators],

      isOverrideOldDrawing: [this.isSaveDrawing, Validators.requiredTrue],
    });

    console.log(this.isSaveDrawing);
    console.log(this.isOverrideOldDrawing);

  }

  // Fetches default dimensions
  private fetchDefaults() {
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

  get width() {
    return this.newDrawingFrom.controls.width.value;
  }
  get height() {
    return this.newDrawingFrom.controls.height.value;
  }
  get backgroundColor() {
    return this.newDrawingFrom.controls.backgroundColor.value;
  }
  set backgroundColor(color: string) {
    this.newDrawingFrom.controls.backgroundColor.setValue(color);
  }
  get backgroundColorHEX() {
    return this.newDrawingFrom.controls.backgroundColorHEX.value;
  }
  set backgroundColorHEX(color: string) {
    this.newDrawingFrom.controls.backgroundColorHEX.setValue(color);
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
  get isOverrideOldDrawing() {
    return this.newDrawingFrom.controls.isOverrideOldDrawing.value;
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

  onCreateClick() {
    this.displaySaveError = true;
  }

  onSubmit() {
    const width = this.width;
    const height = this.height;
    const bgColor = this.backgroundColor;
    this.workZoneService.updateDrawAreaDimensions(width, height, bgColor);
    this.drawAreaService.dirty();
  }

  onColorRGBAChange() {
    this.updateColorHEX();
    this.updateBackgroudColor();
  }

  private updateColorHEX() {
    this.backgroundColorHEX =
      '#' + `${this.convertToHEX(this.red)}` + `${this.convertToHEX(this.green)}` + `${this.convertToHEX(this.blue)}`;
  }

  private convertToHEX(rgb: number): string {
    let hexString = rgb.toString(16).toUpperCase();
    if (hexString.length < 2) {
      hexString = '0' + hexString;
    }
    return hexString;
  }

  private updateBackgroudColor() {
    this.backgroundColor =
      this.formatToRGBA({
        red: this.red,
        green: this.green,
        blue: this.blue,
        opacity: this.opacity,
      });
  }

  onColorHEXChange() {
    this.updateColorRGBA();
    this.updateBackgroudColor();
  }

  private updateColorRGBA() {
    const RED
      = this.convertToDecimal(this.backgroundColorHEX.substring(1, 3));
    const GREEN
      = this.convertToDecimal(this.backgroundColorHEX.substring(3, 5));
    const BLUE
      = this.convertToDecimal(this.backgroundColorHEX.substring(5, 7));

    this.newDrawingFrom.controls.red.setValue(RED);
    this.newDrawingFrom.controls.green.setValue(GREEN);
    this.newDrawingFrom.controls.blue.setValue(BLUE);
  }

  private convertToDecimal(hex: string): number {
    return parseInt(hex, 16);
  }

  chooseBgColor(bgColorHEX: string) {
    this.backgroundColor = bgColorHEX;
    this.backgroundColorHEX = bgColorHEX;
    this.updateColorRGBA();
  }

  getWidthErrorMessage() {
    return this.newDrawingFrom.controls.width.hasError('required') ? 'You must enter a width' : '';
  }

  getHeightErrorMessage() {
    return this.newDrawingFrom.controls.height.hasError('required') ? 'You must enter a height' : '';
  }

  getSaveErrorMessage() {
    return 'Are you sure want to abandon your unsaved work?';
  }

  private formatToRGBA(rgba: RGBA): string {
    return 'rgba(' + rgba.red + ',' + rgba.green + ',' + rgba.blue + ',' + rgba.opacity + ')';
  }

  // prevent keyboard event
  @HostListener('window: keydown', ['$event'])
  @HostListener('window: keypress', ['$event'])
  disableKeyboard(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
