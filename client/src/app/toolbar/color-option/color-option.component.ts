import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { Color } from 'src/utils/color';

@Component({
    selector: 'app-color-option',
    templateUrl: './color-option.component.html',
    styleUrls: ['./color-option.component.scss', '../toolbar-option.scss'],
})
export class ColorOptionComponent implements OnInit {

    alpha: number;

    currentTool: ITool;
    colorsForm: FormGroup;

    colorsHistory: Color[];

    readonly DEFAULT_RED = 255;
    readonly DEFAULT_GREEN = 255;
    readonly DEFAULT_BLUE = 255;
    readonly DEFAULT_ALPHA = 1;
    readonly DEFAULT_BACKGROUND_HEX = '#FFFFFF';

    @Output() color = new EventEmitter<Color>();
    @Input() isPrimary: string;

    constructor(
        private paletteService: PaletteService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
        this.colorsHistory = this.paletteService.getHistory();
    }

    private createForm() {
        const rgbaValidators = [Validators.min(0), Validators.max(255)];
        this.colorsForm = this.formBuilder.group({
            red: [this.DEFAULT_RED, rgbaValidators],
            green: [this.DEFAULT_GREEN, rgbaValidators],
            blue: [this.DEFAULT_BLUE, rgbaValidators],
            alpha: [this.DEFAULT_ALPHA, [Validators.min(0), Validators.max(1)]],
            backgroundColorHEX: [this.DEFAULT_BACKGROUND_HEX, [Validators.min(0), Validators.maxLength(7)]],
        });
    }

    onColorPick(color: Color) {
        this.colorsForm.controls.red.setValue(color.red);
        this.colorsForm.controls.green.setValue(color.green);
        this.colorsForm.controls.blue.setValue(color.blue);
        this.colorsForm.controls.alpha.setValue(color.alpha);
        this.color.emit(color);
        this.updatePalette(color);
    }

    private updatePalette(color: Color) {
        if (this.isPrimary) {
            this.paletteService.selectPrimary(color.red, color.green, color.blue, color.alpha);
        } else {
            this.paletteService.selectSecondary(color.red, color.green, color.blue, color.alpha);
        }
    }

    onColorHEXChange() {
        this.updateColorRGBA();
    }

    private updateColorRGBA() {
        const RED
            = this.convertToDecimal(this.colorsForm.controls.backgroundColorHEX.value.substring(1, 3));
        const GREEN
            = this.convertToDecimal(this.colorsForm.controls.backgroundColorHEX.value.substring(3, 5));
        const BLUE
            = this.convertToDecimal(this.colorsForm.controls.backgroundColorHEX.value.substring(5, 7));
        const ALPHA
            = this.convertToDecimal(this.colorsForm.controls.backgroundColorHEX.value.substring(7, 9)) / 255;

        this.colorsForm.controls.red.setValue(RED);
        this.colorsForm.controls.green.setValue(GREEN);
        this.colorsForm.controls.blue.setValue(BLUE);
        this.updatePalette({ red: RED, green: GREEN, blue: BLUE, alpha: ALPHA });
    }

    private convertToDecimal(hex: string): number {
        return parseInt(hex, 16);
    }

    onColorRGBAChange() {
        this.updateColorHEX();
    }

    private updateColorHEX() {
        const RED = this.colorsForm.controls.red.value;
        const GREEN = this.colorsForm.controls.green.value;
        const BLUE = this.colorsForm.controls.blue.value;
        const ALPHA = this.colorsForm.controls.alpha.value;
        const backgroundColorHEX =
            '#' +
            `${this.convertToHEX(RED)}` +
            `${this.convertToHEX(GREEN)}` +
            `${this.convertToHEX(BLUE)}` +
            `${this.convertToHEX(ALPHA)}`;
        this.colorsForm.controls.backgroundColorHEX.setValue(backgroundColorHEX);
        this.updatePalette({ red: RED, green: GREEN, blue: BLUE, alpha: ALPHA });
    }

    private convertToHEX(rgb: number): string {
        let hexString = rgb.toString(16).toUpperCase();
        if (hexString.length < 2) {
            hexString = '0' + hexString;
        }
        return hexString;
    }

    onAlphaChange() {
        this.colorsForm.controls.alpha.setValue(this.colorsForm.controls.alpha.value);
        const color = {
            red: this.colorsForm.controls.red.value,
            green: this.colorsForm.controls.green.value,
            blue: this.colorsForm.controls.blue.value,
            alpha: this.colorsForm.controls.alpha.value,
        };
        this.updatePalette(color);
    }

    setPrimaryColor() {
        return {
            'background-color': `${this.paletteService.getPrimary()}`,
        };
    }
    setSecondaryColor() {
        return {
            'background-color': `${this.paletteService.getSecondary()}`,
        };
    }

    validate(event: Event) {
        console.log(event);
    }
}
