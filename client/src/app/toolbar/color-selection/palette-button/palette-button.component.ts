import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';
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
            this.currentColor = this.paletteService.primary;
        } else if (this.isSecondaryColor) {
            this.currentColor = this.paletteService.secondary;
        }
    }

    protected applyColor(): void {
        Color.getColorFromHex(this.colorsForm.controls.colorHEX.value);
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
        this.currentColor.alpha = this.colorsForm.controls.alpha.value;
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
