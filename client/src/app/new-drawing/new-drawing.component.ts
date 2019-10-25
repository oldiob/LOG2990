import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SVGService } from 'src/services/svg/svg.service';
import { Color } from 'src/utils/color';
import { WorkZoneService } from '../../services/work-zone/work-zone.service';
import { DrawAreaService } from './../../services/draw-area/draw-area.service';
import { CmdService } from 'src/services/cmd/cmd.service';

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
    readonly DEFAULT_ALPHA = 1;

    isSavedDrawing: boolean;
    displaySaveError: boolean;
    isShowColorPicker: boolean;

    defaultWidth: number;
    defaultHeight: number;
    color: Color;
    newDrawingFrom: FormGroup;

    private widthSubscription: Subscription;
    private heightSubscription: Subscription;

    constructor(
        private svgService: SVGService,
        private formBuilder: FormBuilder,
        private workZoneService: WorkZoneService,
        private drawAreaService: DrawAreaService) {
        this.displaySaveError = false;
        this.isShowColorPicker = false;
    }

    ngOnInit() {
        this.isSavedDrawing = this.drawAreaService.isSavedDrawing;
        this.createForm();
        this.fetchDefaults();
        this.updateColorRGBA();
    }

    private createForm() {
        const DEFAULT_BACKGROUND_RGBA: Color = new Color(
            this.DEFAULT_RED,
            this.DEFAULT_GREEN,
            this.DEFAULT_BLUE,
            this.DEFAULT_ALPHA);

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
            alpha: [this.DEFAULT_ALPHA, [Validators.min(0), Validators.max(1)]],

            isOverrideOldDrawing: [this.isSavedDrawing, Validators.requiredTrue],
        });
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
    get alpha() {
        return this.newDrawingFrom.controls.alpha.value;
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

    onColorPick(color: Color) {
        this.backgroundColor = color.toString();
        this.newDrawingFrom.controls.red.setValue(color.red);
        this.newDrawingFrom.controls.green.setValue(color.green);
        this.newDrawingFrom.controls.blue.setValue(color.blue);
        this.newDrawingFrom.controls.alpha.setValue(color.alpha);
        this.updateColorHEX();
    }

    onSubmit() {
        const width = this.width;
        const height = this.height;
        const bgColor = this.backgroundColor;
        this.workZoneService.updateDrawAreaDimensions(width, height, bgColor);
        this.drawAreaService.dirty();
        this.svgService.clearDrawArea();
        CmdService.reset();
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
        const color: Color = new Color(this.red, this.blue, this.green, this.alpha);
        this.backgroundColor = color.toString();
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

    showColorPicker() {
        this.isShowColorPicker = !this.isShowColorPicker;
    }
}
