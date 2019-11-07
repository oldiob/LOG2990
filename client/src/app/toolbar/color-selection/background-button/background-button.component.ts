import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { Color } from 'src/utils/color';
import { AbsColorButton } from '../abs-color-button/abs-color-button.component';

@Component({
    selector: 'app-background-button',
    templateUrl: './../abs-color-button/abs-color-button.component.html',
    styleUrls: ['./../abs-color-button/abs-color-button.component.scss'],
})
export class BackgroundButtonComponent
    extends AbsColorButton implements OnInit {

    backgroundColor: Color;

    constructor(
        protected paletteService: PaletteService,
        protected formBuilder: FormBuilder,
        private workZoneService: WorkZoneService) {
        super(paletteService, formBuilder);
    }

    ngOnInit() {
        this.isSettingsShown = false;
        this.setupColors();
        this.createForm();
        this.setTip();
    }

    protected setTip(): void {
        this.tip = 'Background Color';
    }

    protected setupColors(): void {
        this.r = this.paletteService.primary.red;
        this.g = this.paletteService.primary.green;
        this.b = this.paletteService.primary.blue;
        this.a = this.paletteService.primary.alpha;
        this.hex =
            '#' +
            `${this.convertToHEX(this.r)}` +
            `${this.convertToHEX(this.g)}` +
            `${this.convertToHEX(this.b)}`;

        this.backgroundColor = new Color(this.r, this.g, this.b, this.a);
    }

    protected applyColor(): void {
        this.workZoneService.updateBackgroundColor(
            this.currentColor.toString(),
        );
        this.backgroundColor = this.currentColor;
    }

    protected onAlphaChange(): void {
        this.currentColor = {
            red: this.backgroundColor.red,
            green: this.backgroundColor.green,
            blue: this.backgroundColor.blue,
            alpha: this.colorsForm.controls.alpha.value,
        };
        this.applyColor();
    }

    protected setColor(): {} {
        return {
            'background-color': `${this.backgroundColor.toString()}`,
        };
    }

}
