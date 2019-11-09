import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CmdService } from 'src/services/cmd/cmd.service';
import { SVGService } from 'src/services/svg/svg.service';
import { Color } from 'src/utils/color';
import { DrawAreaService } from '../../../services/draw-area/draw-area.service';
import { WorkZoneService } from '../../../services/work-zone/work-zone.service';

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

    backgroundColor: Color;

    isSavedDrawing: boolean;
    displaySaveError: boolean;
    isShowColorPicker: boolean;

    defaultWidth: number;
    defaultHeight: number;

    newDrawingFrom: FormGroup;

    private widthSubscription: Subscription;
    private heightSubscription: Subscription;

    colorChoices: Color[];

    constructor(
        private svgService: SVGService,
        private formBuilder: FormBuilder,
        private workZoneService: WorkZoneService,
        private drawAreaService: DrawAreaService) {
        this.displaySaveError = false;
        this.isShowColorPicker = false;
    }

    ngOnInit() {
        this.isSavedDrawing = this.drawAreaService.isSaved;
        this.createForm();
        this.fetchDefaults();
        this.updateColorRGBA();
        this.setupColorChoices();
    }

    private setupColorChoices() {
        this.colorChoices = [
            new Color(255, 255, 255, 1),
            new Color(255, 92, 92, 1),
            new Color(55, 96, 255, 1),
            new Color(57, 229, 255, 1),
            new Color(85, 233, 188, 1),
            new Color(163, 255, 135, 1),
            new Color(255, 255, 121, 1),
            new Color(255, 158, 102, 1),
        ];
    }

    private createForm() {
        // Form to create new work zone to draw
        const rgbaValidators = [Validators.min(0), Validators.max(255)];
        const dimentionsValidators = [Validators.min(0), Validators.required];

        this.newDrawingFrom = this.formBuilder.group({
            height: [this.defaultHeight, dimentionsValidators],
            width: [this.defaultWidth, dimentionsValidators],

            backgroundColorHEX: [this.DEFAULT_BACKGROUND_HEX],

            red: [this.DEFAULT_RED, rgbaValidators],
            green: [this.DEFAULT_GREEN, rgbaValidators],
            blue: [this.DEFAULT_BLUE, rgbaValidators],
            alpha: [this.DEFAULT_ALPHA, [Validators.min(0), Validators.max(1)]],

            isOverrideOldDrawing: [this.isSavedDrawing, Validators.requiredTrue],
        });
        this.backgroundColor = new Color(
            this.DEFAULT_RED,
            this.DEFAULT_GREEN,
            this.DEFAULT_BLUE,
            this.DEFAULT_ALPHA,
        );
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
        this.backgroundColor = color;
        this.newDrawingFrom.controls.red.setValue(color.red);
        this.newDrawingFrom.controls.green.setValue(color.green);
        this.newDrawingFrom.controls.blue.setValue(color.blue);
        this.newDrawingFrom.controls.alpha.setValue(color.alpha);
        this.updateColorHEX();
    }

    onSubmit() {
        this.workZoneService.updateDrawAreaProperties(this.width, this.height, this.backgroundColor);
        this.drawAreaService.dirty();
        this.svgService.clearObjects();
        CmdService.reset();
    }

    onColorRGBAChange() {
        this.updateColorHEX();
        this.updateBackgroudColor();
    }

    private updateColorHEX() {
        const FULL_ALPHA = 1;
        const color = new Color(
            this.red,
            this.green,
            this.blue,
            FULL_ALPHA,
        );
        this.backgroundColorHEX = color.toHex();
    }

    private updateBackgroudColor() {
        this.backgroundColor = new Color(this.red, this.blue, this.green, this.alpha);
    }

    onColorHEXChange() {
        this.updateColorRGBA();
        this.updateBackgroudColor();
    }

    private updateColorRGBA() {
        const color: Color = Color.getColorFromHex(this.backgroundColorHEX);
        this.newDrawingFrom.controls.red.setValue(color.red);
        this.newDrawingFrom.controls.green.setValue(color.green);
        this.newDrawingFrom.controls.blue.setValue(color.blue);
    }

    chooseBackgroundColor(color: Color) {
        this.backgroundColor = color;
        this.backgroundColorHEX = color.toHex();
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
