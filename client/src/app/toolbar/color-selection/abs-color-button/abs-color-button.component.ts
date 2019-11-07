import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';
import { ColorButtonType } from '../color-button-type';

@Injectable()
export abstract class AbsColorButton {

    icon: string;
    tip: string;

    currentColor: Color;
    colorsForm: FormGroup;
    colorsHistory: Color[];

    r: number;
    g: number;
    b: number;
    a: number;
    hex: string;

    @Input() type: ColorButtonType;
    @Input() isSettingsShown: boolean;
    @Output() open = new EventEmitter<boolean>();

    constructor(
        protected paletteService: PaletteService,
        protected formBuilder: FormBuilder) {
    }

    protected abstract setupView(): void;

    protected abstract setupColors(): void;

    protected abstract applyColor(): void;

    protected abstract onAlphaChange(): void;

    protected abstract setColor(): {};

    protected createForm(): void {
        const rgbaValidators = [Validators.min(0), Validators.max(255)];
        this.colorsForm = this.formBuilder.group({
            red: [this.r, rgbaValidators],
            green: [this.g, rgbaValidators],
            blue: [this.b, rgbaValidators],
            alpha: [this.a, [Validators.min(0), Validators.max(1)]],
            colorHEX: [this.hex, [Validators.min(0), Validators.maxLength(7)]],
        });
    }

    onColorPick(color: Color): void {
        this.currentColor = color;
        this.colorsForm.controls.red.setValue(color.red);
        this.colorsForm.controls.green.setValue(color.green);
        this.colorsForm.controls.blue.setValue(color.blue);
        this.updateColorHEX();
        this.updateColorRGBA();
    }

    onMouseUp() {
        this.applyColor();
        this.hideForm();
        this.colorsHistory = this.paletteService.getHistory();
    }

    onOldColor(color: Color) {
        this.onColorPick(color);
        this.applyColor();
        this.hideForm();
    }

    onColorHEXChange(): void {
        this.updateColorRGBA();
    }

    private updateColorRGBA() {
        const red
            = this.convertToDecimal(this.colorsForm.controls.colorHEX.value.substring(1, 3));
        const green
            = this.convertToDecimal(this.colorsForm.controls.colorHEX.value.substring(3, 5));
        const blue
            = this.convertToDecimal(this.colorsForm.controls.colorHEX.value.substring(5, 7));

        this.colorsForm.controls.red.setValue(red);
        this.colorsForm.controls.green.setValue(green);
        this.colorsForm.controls.blue.setValue(blue);
        const FULL_ALPHA = 1;
        this.currentColor = new Color(red, green, blue, FULL_ALPHA);
    }

    private convertToDecimal(hex: string): number {
        return parseInt(hex, 16);
    }

    onColorRGBAChange(): void {
        this.updateColorHEX();
    }

    private updateColorHEX(): void {
        const red = this.colorsForm.controls.red.value;
        const green = this.colorsForm.controls.green.value;
        const blue = this.colorsForm.controls.blue.value;
        const alpha = this.colorsForm.controls.alpha.value;
        const colorHEX =
            '#' +
            `${this.convertToHEX(red)}` +
            `${this.convertToHEX(green)}` +
            `${this.convertToHEX(blue)}`;
        this.colorsForm.controls.colorHEX.setValue(colorHEX);
        this.currentColor = new Color(red, green, blue, alpha);
    }

    protected convertToHEX(rgb: number): string {
        let hexString = rgb.toString(16).toUpperCase();
        if (hexString.length < 2) {
            hexString = '0' + hexString;
        }
        return hexString;
    }

    toggleForm(): void {
        this.isSettingsShown = !this.isSettingsShown;
        this.open.emit(this.isSettingsShown);
        this.colorsHistory = this.paletteService.getHistory();
    }

    hideForm(): void {
        this.isSettingsShown = false;
        this.open.emit(this.isSettingsShown);
    }
}
