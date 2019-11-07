import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { AbsColorButton } from '../abs-color-button/abs-color-button.component';

@Component({
    selector: 'app-background-button',
    templateUrl: './../abs-color-button/abs-color-button.component.html',
    styleUrls: ['./../abs-color-button/abs-color-button.component.scss'],
})
export class BackgroundButtonComponent
    extends AbsColorButton implements OnInit {

    backgroundColor: string;

    constructor(
        protected paletteService: PaletteService,
        protected formBuilder: FormBuilder,
        private workZoneService: WorkZoneService) {
        super(paletteService, formBuilder);
    }

    ngOnInit() {
        this.isSettingsShown = false;
        this.createForm();
        this.setupColors();
        this.setupView();
    }

    protected setupView(): void {
        this.tip = 'Background Color';
        this.icon = 'landscape';
    }

    protected setupColors(): void {
        this.backgroundColor = '#FFFFFF';
        this.workZoneService.currentBackgroundColor.subscribe(
            (backgroundColor: string) => {
                this.backgroundColor = backgroundColor;
            });
    }

    protected applyColor(): void {
        this.workZoneService.updateBackgroundColor(
            this.currentColor.toString(),
        );
        this.backgroundColor = this.currentColor.toString();
    }

    protected onAlphaChange(): void {
        this.currentColor.alpha = this.colorsForm.controls.alpha.value;
        this.applyColor();
    }

    protected setColor(): {} {
        return {
            'background-color': `${this.backgroundColor}`,
        };
    }
}
