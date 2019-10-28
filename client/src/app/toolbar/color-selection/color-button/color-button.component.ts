import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';

@Component({
    selector: 'app-color-button',
    templateUrl: './color-button.component.html',
    styleUrls: ['./color-button.component.scss'],
})
export class ColorButtonComponent implements OnInit {

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
    @Input() isPrimary: boolean;
    @Output() open = new EventEmitter<boolean>();

    constructor(
        private paletteService: PaletteService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.isShowForm = false;
        this.setupColors();
        this.createForm();
    }

    private setupColors() {
        if (this.isPrimary) {
            this.r = this.paletteService.primary.red;
            this.g = this.paletteService.primary.green;
            this.b = this.paletteService.primary.blue;
            this.a = this.paletteService.primary.alpha;
            this.hex =
                '#' +
                `${this.convertToHEX(this.r)}` +
                `${this.convertToHEX(this.g)}` +
                `${this.convertToHEX(this.b)}`;
        } else {
            this.r = this.paletteService.secondary.red;
            this.g = this.paletteService.secondary.green;
            this.b = this.paletteService.secondary.blue;
            this.a = this.paletteService.secondary.alpha;
            this.hex =
                '#' +
                `${this.convertToHEX(this.r)}` +
                `${this.convertToHEX(this.g)}` +
                `${this.convertToHEX(this.b)}`;
        }
    }

    private createForm(): void {
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
        this.updatePalette();
        this.hideForm();
        this.colorsHistory = this.paletteService.getHistory();
    }

    onOldColor(color: Color) {
        this.onColorPick(color);
        this.updatePalette();
        this.hideForm();
    }

    updatePalette(): void {
        if (this.isPrimary) {
            this.paletteService.selectPrimary(
                this.currentColor.red,
                this.currentColor.green,
                this.currentColor.blue,
                this.currentColor.alpha,
            );
        } else {
            this.paletteService.selectSecondary(
                this.currentColor.red,
                this.currentColor.green,
                this.currentColor.blue,
                this.currentColor.alpha,
            );
        }
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

    private convertToHEX(rgb: number): string {
        let hexString = rgb.toString(16).toUpperCase();
        if (hexString.length < 2) {
            hexString = '0' + hexString;
        }
        return hexString;
    }

    onAlphaChange(): void {
        if (this.isPrimary) {
            this.currentColor = {
                red: this.paletteService.primary.red,
                green: this.paletteService.primary.green,
                blue: this.paletteService.primary.blue,
                alpha: this.colorsForm.controls.alpha.value,
            };
        } else {
            this.currentColor = {
                red: this.paletteService.secondary.red,
                green: this.paletteService.secondary.green,
                blue: this.paletteService.secondary.blue,
                alpha: this.colorsForm.controls.alpha.value,
            };
        }
        this.updatePalette();
    }

    toggleForm(): void {
        this.isShowForm = !this.isShowForm;
        this.open.emit(this.isShowForm);
        this.colorsHistory = this.paletteService.getHistory();
    }

    hideForm(): void {
        this.isShowForm = false;
    }

    setColor() {
        let style = {};
        if (this.isPrimary) {
            style = {
                'background-color': `${this.paletteService.getPrimary()}`,
            };
        } else {
            style = {
                'background-color': `${this.paletteService.getSecondary()}`,
            };
        }
        return style;
    }
}