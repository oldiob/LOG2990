import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaletteService } from 'src/services/palette/palette.service';
import { ITool } from 'src/services/tool/tool-options/i-tool';

@Component({
    selector: 'app-color-option',
    templateUrl: './color-option.component.html',
    styleUrls: ['./color-option.component.scss', '../toolbar-option.scss'],
})
export class ColorOptionComponent implements OnInit {

    currentTool: ITool;
    colorsForm: FormGroup;

    constructor(
        private paletteService: PaletteService,
        private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.createForm();
    }

    private createForm() {
        const DEFAULT_RED = 255;
        const DEFAULT_GREEN = 255;
        const DEFAULT_BLUE = 255;
        const DEFAULT_ALPHA = 1;
        const rgbaValidators = [Validators.min(0), Validators.max(255)];

        this.colorsForm = this.formBuilder.group({
            red: [DEFAULT_RED, rgbaValidators],
            green: [DEFAULT_GREEN, rgbaValidators],
            blue: [DEFAULT_BLUE, rgbaValidators],
            alpha: [DEFAULT_ALPHA, [Validators.min(0), Validators.max(1)]],
        });
    }

    onWidthChange() {
        this.currentTool.width = this.colorsForm.controls.width.value;
    }

    onTraceTypeChange() {
        this.currentTool.traceType = this.colorsForm.controls.traceType.value;
    }
}
