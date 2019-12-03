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

    defaultColor: Color;

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
            red: [this.currentColor.red, rgbaValidators],
            green: [this.currentColor.green, rgbaValidators],
            blue: [this.currentColor.blue, rgbaValidators],
            alpha: [this.currentColor.alpha, [Validators.min(0), Validators.max(1)]],
            colorHEX: [this.currentColor.toHex(), [Validators.min(0), Validators.maxLength(7)]],
        });
    }

    protected updateForm() {
        this.colorsForm.controls.red.setValue(this.currentColor.red);
        this.colorsForm.controls.green.setValue(this.currentColor.green);
        this.colorsForm.controls.blue.setValue(this.currentColor.blue);
        this.colorsForm.controls.alpha.setValue(this.currentColor.alpha);
        this.colorsForm.controls.colorHEX.setValue(this.currentColor.toHex());
    }

    onColorPick(color: Color): void {
        this.currentColor = color;
        this.updateForm();
    }

    onClose() {
        this.applyColor();
        this.hideForm();
        this.colorsHistory = this.paletteService.getHistory();
    }

    onOldColor(color: Color) {
        this.onColorPick(color);
    }

    onColorHEXChange(): void {
        this.currentColor = Color.getColorFromHex(this.colorsForm.controls.colorHEX.value);
        this.updateForm();
    }

    onColorRGBAChange(): void {
        this.currentColor = new Color(
            this.colorsForm.controls.red.value,
            this.colorsForm.controls.green.value,
            this.colorsForm.controls.blue.value,
            this.colorsForm.controls.alpha.value,
        );
        this.colorsForm.controls.colorHEX.setValue(this.currentColor.toHex());
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
