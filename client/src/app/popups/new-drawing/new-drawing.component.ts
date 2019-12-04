import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CmdService } from 'src/services/cmd/cmd.service';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolService } from 'src/services/tool/tool.service';
import { Color } from 'src/utils/color';
import { MyInjector } from 'src/utils/injector';
import { DrawAreaService } from '../../../services/draw-area/draw-area.service';
import { WorkZoneService } from '../../../services/work-zone/work-zone.service';

@Component({
    selector: 'app-new-drawing',
    templateUrl: './new-drawing.component.html',
    styleUrls: ['./new-drawing.component.scss'],
})
export class NewDrawingComponent implements OnInit {
    readonly DEFAULT_HEX = '#FFFFFF';

    readonly DEFAULT_RED = 255;
    readonly DEFAULT_GREEN = 255;
    readonly DEFAULT_BLUE = 255;
    readonly DEFAULT_ALPHA = 1;

    backgroundColor: Color;

    isDrawingSaved: boolean;
    displaySaveError: boolean;
    isColorPickerShown: boolean;

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
        this.isColorPickerShown = false;
    }

    ngOnInit() {
        this.isDrawingSaved = this.drawAreaService.isSaved;
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
        const rgbaValidators = [Validators.min(0), Validators.max(255)];
        const dimentionsValidators = [Validators.min(0), Validators.required];

        this.newDrawingFrom = this.formBuilder.group({
            height: [this.defaultHeight, dimentionsValidators],
            width: [this.defaultWidth, dimentionsValidators],

            hex: [this.DEFAULT_HEX],

            red: [this.DEFAULT_RED, rgbaValidators],
            green: [this.DEFAULT_GREEN, rgbaValidators],
            blue: [this.DEFAULT_BLUE, rgbaValidators],
            alpha: [this.DEFAULT_ALPHA, [Validators.min(0), Validators.max(1)]],

            isOverrideOldDrawing: [this.isDrawingSaved, Validators.requiredTrue],
        });
        this.backgroundColor = new Color(
            this.DEFAULT_RED,
            this.DEFAULT_GREEN,
            this.DEFAULT_BLUE,
            this.DEFAULT_ALPHA,
        );
    }

    private fetchDefaults() {
        this.widthSubscription = this.workZoneService.currentMaxWidth.subscribe((maxWidth) => {
            this.newDrawingFrom.controls.width.setValue(maxWidth);
            this.defaultWidth = maxWidth;
        });

        this.heightSubscription = this.workZoneService.currentMaxHeight.subscribe((maxHeight) => {
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

    get hex() {
        return this.newDrawingFrom.controls.hex.value;
    }
    set hex(color: string) {
        this.newDrawingFrom.controls.hex.setValue(color);
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
        this.workZoneService.updateDrawAreaProperties(this.width, this.height, this.backgroundColor.toRGBA());
        this.drawAreaService.dirty();
        this.svgService.clearObjects();
        CmdService.reset();

        // for the tool to refresh
        MyInjector.get(ToolService).currentTool = MyInjector.get(ToolService).currentTool;
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
        this.hex = color.toHex();
    }

    private updateBackgroudColor() {
        this.backgroundColor = new Color(this.red, this.blue, this.green, this.alpha);
    }

    onColorHEXChange() {
        this.updateColorRGBA();
        this.updateBackgroudColor();
    }

    private updateColorRGBA() {
        const color: Color = Color.getColorFromHex(this.hex);
        this.newDrawingFrom.controls.red.setValue(color.red);
        this.newDrawingFrom.controls.green.setValue(color.green);
        this.newDrawingFrom.controls.blue.setValue(color.blue);
    }

    chooseBackgroundColor(color: Color) {
        this.backgroundColor = color;
        this.hex = color.toHex();
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
        this.isColorPickerShown = !this.isColorPickerShown;
    }
}
