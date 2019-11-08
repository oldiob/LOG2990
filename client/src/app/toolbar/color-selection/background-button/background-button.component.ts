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
        this.updateForm();
        this.setupView();
    }

    protected setupView(): void {
        this.tip = 'Background Color';
        this.icon = 'landscape';
    }

    protected setupColors(): void {
        this.workZoneService.currentBackgroundColor.subscribe(
            (backgroundColor: Color) => {
                this.currentColor = backgroundColor;
                console.log(this.currentColor);
                if (this.colorsForm) {
                    this.updateForm();
                }
            });
    }

    protected applyColor(): void {
        this.workZoneService.updateBackgroundColor(
            this.currentColor,
        );
    }

    onMouseUp() {
        this.paletteService.previous.add(this.currentColor);
        this.applyColor();
        this.hideForm();
        this.colorsHistory = this.paletteService.getHistory();
    }

    protected onAlphaChange(): void {
        this.currentColor.alpha = this.colorsForm.controls.alpha.value;
        this.applyColor();
    }

    protected setColor(): {} {
        return {
            'background-color': `${this.currentColor.toString()}`,
        };
    }
}
