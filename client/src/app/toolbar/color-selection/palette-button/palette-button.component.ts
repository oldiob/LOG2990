import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { AbsColorButton } from '../abs-color-button/abs-color-button.component';
import { ColorButtonType } from '../color-button-type';

@Component({
    selector: 'app-palette-button',
    templateUrl: './../abs-color-button/abs-color-button.component.html',
    styleUrls: ['./../abs-color-button/abs-color-button.component.scss'],
})
export class PaletteButtonComponent
    extends AbsColorButton implements OnInit {

    private isPrimaryColor: boolean;
    private isSecondaryColor: boolean;

    constructor(
        protected paletteService: PaletteService,
        protected formBuilder: FormBuilder) {
        super(paletteService, formBuilder);
    }

    ngOnInit(): void {
        this.isPrimaryColor = this.type === ColorButtonType.PrimaryColor;
        this.isSecondaryColor = this.type === ColorButtonType.SecondaryColor;
        this.isSettingsShown = false;
        this.setupColors();
        this.createForm();
        this.setupView();
    }

    protected setupView(): void {
        this.icon = '';
        this.tip = this.isPrimaryColor ? this.tip = 'Primary Color'
            : this.isSecondaryColor ? this.tip = 'Secondary Color'
                : '';
    }

    protected setupColors(): void {
        if (this.isPrimaryColor) {
            this.setupPrimaryColor();
        } else if (this.isSecondaryColor) {
            this.setupSecondaryColor();
        }
    }

    private setupSecondaryColor(): void {
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

    private setupPrimaryColor(): void {
        this.r = this.paletteService.primary.red;
        this.g = this.paletteService.primary.green;
        this.b = this.paletteService.primary.blue;
        this.a = this.paletteService.primary.alpha;
        this.hex =
            '#' +
            `${this.convertToHEX(this.r)}` +
            `${this.convertToHEX(this.g)}` +
            `${this.convertToHEX(this.b)}`;
    }

    protected applyColor(): void {
        if (this.isPrimaryColor) {
            this.paletteService.selectPrimary(
                this.currentColor.red,
                this.currentColor.green,
                this.currentColor.blue,
                this.currentColor.alpha,
            );
        } else if (this.isSecondaryColor) {
            this.paletteService.selectSecondary(
                this.currentColor.red,
                this.currentColor.green,
                this.currentColor.blue,
                this.currentColor.alpha,
            );
        }
    }

    onAlphaChange(): void {
        if (this.isPrimaryColor) {
            this.currentColor = {
                red: this.paletteService.primary.red,
                green: this.paletteService.primary.green,
                blue: this.paletteService.primary.blue,
                alpha: this.colorsForm.controls.alpha.value,
            };
        } else if (this.isSecondaryColor) {
            this.currentColor = {
                red: this.paletteService.secondary.red,
                green: this.paletteService.secondary.green,
                blue: this.paletteService.secondary.blue,
                alpha: this.colorsForm.controls.alpha.value,
            };
        }
        this.applyColor();
    }

    setColor(): {} {
        const primaryColorStyle = {
            'background-color': `${this.paletteService.getPrimary()}`,
        };
        const secondaryColorStyle = {
            'background-color': `${this.paletteService.getSecondary()}`,
        };

        return this.isPrimaryColor ? primaryColorStyle
            : this.isSecondaryColor ? secondaryColorStyle
                : {};
    }
}
