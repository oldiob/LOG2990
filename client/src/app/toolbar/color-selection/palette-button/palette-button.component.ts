import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { AbsColorButton } from '../abs-color-button/abs-color-button.component';

@Component({
    selector: 'app-palette-button',
    templateUrl: './../abs-color-button/abs-color-button.component.html',
    styleUrls: ['./../abs-color-button/abs-color-button.component.scss'],
})
export class PaletteButtonComponent
    extends AbsColorButton implements OnInit {

    @Input() isPrimary: boolean;

    constructor(
        protected paletteService: PaletteService,
        protected formBuilder: FormBuilder) {
        super(paletteService, formBuilder);
    }

    ngOnInit(): void {
        this.isShowForm = false;
        this.setupColors();
        this.createForm();
        this.setTip();
    }

    protected setTip(): void {
        if (this.isPrimary) {
            this.tip = 'Primary Color';
        } else {
            this.tip = 'Secondary Color';
        }
    }

    protected setupColors() {
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

    protected applyColor(): void {
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
        this.applyColor();
    }

    setColor(): {} {
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
