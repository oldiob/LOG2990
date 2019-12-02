import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SVGService } from 'src/services/svg/svg.service';
import { exportImage, saveFile } from 'src/utils/filesystem';

@Component({
    selector: 'app-export-option',
    templateUrl: './export-option.component.html',
    styleUrls: ['./export-option.component.scss'],
})
export class ExportOptionComponent implements OnInit {
    tip = 'Export (Ctrl + E)';
    selectedExport: string;
    exportForm: FormGroup;
    exportTypes: string[];
    isEnabled: boolean;
    constructor(private formBuilder: FormBuilder, private svgService: SVGService) {
        this.selectedExport = 'svg';
        this.exportTypes = ['svg', 'png', 'jpg', 'bmp'];
        this.isEnabled = false;
    }

    ngOnInit(): void {
        this.createExportForm();
    }

    saveAsSVG(): void {
        saveFile(this.exportForm.controls.name.value, this.svgService.entry.nativeElement.outerHTML, this.exportTypes[0]);
    }

    saveAsPNG(): void {
        exportImage(this.exportForm.controls.name.value, this.svgService.entry, this.exportTypes[1]);
    }

    saveAsJPG(): void {
        exportImage(this.exportForm.controls.name.value, this.svgService.entry, this.exportTypes[2]);
    }

    saveAsBMP(): void {
        exportImage(this.exportForm.controls.name.value, this.svgService.entry, this.exportTypes[3]);
    }

    getNameErrorMessage() {
        return this.exportForm.controls.name.hasError('required') ? 'You must enter a name' : '';
    }

    checkButton(): void {
        this.isEnabled = this.exportForm.valid;
    }

    onClick() {
        this.checkButton();
        this.selectedExport = this.exportForm.controls.export.value;
    }

    submit(): void {
        this.checkButton();
        switch (this.selectedExport) {
            case this.exportTypes[0]:
                this.saveAsSVG();
                break;
            case this.exportTypes[1]:
                this.saveAsPNG();
                break;
            case this.exportTypes[2]:
                this.saveAsJPG();
                break;
            case this.exportTypes[3]:
                this.saveAsBMP();
                break;
        }
    }

    private createExportForm(): void {
        const DEFAULT_NAME = 'Untitled';
        const DEFAULT_EXPORT = this.selectedExport[0];
        const validators = [Validators.required];

        this.exportForm = this.formBuilder.group({
            name: [DEFAULT_NAME, validators],
            export: [DEFAULT_EXPORT, validators],
        });
        this.exportForm.controls.name.setValue(DEFAULT_NAME);
        this.exportForm.controls.export.setValue(DEFAULT_EXPORT);
    }
}
