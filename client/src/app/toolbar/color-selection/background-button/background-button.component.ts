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

    private chosenColor: Color;

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
        this.chosenColor = this.currentColor;
    }

    protected setupView(): void {
        this.tip = 'Background Color';
        this.icon = 'landscape';
    }

    protected setupColors(): void {
        this.workZoneService.currentBackgroundColor.subscribe(
            (backgroundColor: Color) => {
                this.currentColor = new Color(
                    backgroundColor.red,
                    backgroundColor.green,
                    backgroundColor.blue,
                    backgroundColor.alpha,
                );
                this.chosenColor = new Color(
                    backgroundColor.red,
                    backgroundColor.green,
                    backgroundColor.blue,
                    backgroundColor.alpha,
                );
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

    onClose() {
        this.paletteService.previous.add(this.currentColor);
        this.applyColor();
        this.hideForm();
        this.colorsHistory = this.paletteService.getHistory();
        this.chosenColor = new Color(
            this.currentColor.red,
            this.currentColor.green,
            this.currentColor.blue,
            this.currentColor.alpha,
        );
    }

    protected onAlphaChange(): void {
        this.currentColor.alpha = this.colorsForm.controls.alpha.value;
    }

    protected setColor(): {} {
        return {
            'background-color': `${this.chosenColor.toRGBA()}`,
        };
    }
}
