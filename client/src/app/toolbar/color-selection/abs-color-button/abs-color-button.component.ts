import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';

@Injectable()
export abstract class AbsColorButton {

    tip: string;
    alpha: number;

    currentColor: Color;
    colorsForm: FormGroup;

    colorsHistory: Color[];

    r: number;
    g: number;
    b: number;
    a: number;
    hex: string;

    @Input() isShowForm: boolean;
    @Output() open = new EventEmitter<boolean>();

    constructor(
        protected paletteService: PaletteService,
        protected formBuilder: FormBuilder) {
    }

    protected abstract setTip(): void;

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
        const RED
            = this.convertToDecimal(this.colorsForm.controls.colorHEX.value.substring(1, 3));
        const GREEN
            = this.convertToDecimal(this.colorsForm.controls.colorHEX.value.substring(3, 5));
        const BLUE
            = this.convertToDecimal(this.colorsForm.controls.colorHEX.value.substring(5, 7));

        this.colorsForm.controls.red.setValue(RED);
        this.colorsForm.controls.green.setValue(GREEN);
        this.colorsForm.controls.blue.setValue(BLUE);
        const FULL_ALPHA = 1;
        this.currentColor = { red: RED, green: GREEN, blue: BLUE, alpha: FULL_ALPHA };
    }

    private convertToDecimal(hex: string): number {
        return parseInt(hex, 16);
    }

    onColorRGBAChange(): void {
        this.updateColorHEX();
    }

    private updateColorHEX(): void {
        const RED = this.colorsForm.controls.red.value;
        const GREEN = this.colorsForm.controls.green.value;
        const BLUE = this.colorsForm.controls.blue.value;
        const ALPHA = this.colorsForm.controls.alpha.value;
        const colorHEX =
            '#' +
            `${this.convertToHEX(RED)}` +
            `${this.convertToHEX(GREEN)}` +
            `${this.convertToHEX(BLUE)}`;
        this.colorsForm.controls.colorHEX.setValue(colorHEX);
        this.currentColor = { red: RED, green: GREEN, blue: BLUE, alpha: ALPHA };
    }

    protected convertToHEX(rgb: number): string {
        let hexString = rgb.toString(16).toUpperCase();
        if (hexString.length < 2) {
            hexString = '0' + hexString;
        }
        return hexString;
    }

    toggleForm(): void {
        this.isShowForm = !this.isShowForm;
        this.open.emit(this.isShowForm);
        this.colorsHistory = this.paletteService.getHistory();
    }

    hideForm(): void {
        this.isShowForm = false;
        this.open.emit(this.isShowForm);
    }
}
