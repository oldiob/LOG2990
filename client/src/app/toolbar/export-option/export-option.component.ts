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
    option = 'svg';
    exportForm: FormGroup;
    selectExport: string[];
    enable: boolean;
    constructor(private formBuilder: FormBuilder, private svgService: SVGService) {
        this.selectExport = ['svg', 'png', 'jpg', 'bmp'];
        this.enable = false;
    }

    ngOnInit(): void {
        this.createExportForm();
    }

    saveAsSVG(): void {
        saveFile(this.exportForm.controls.name.value, this.svgService.entry.nativeElement.outerHTML, this.selectExport[0]);
    }

    saveAsPNG(): void {
        exportImage(this.exportForm.controls.name.value, this.svgService.entry, this.selectExport[1]);
    }

    saveAsJPG(): void {
        exportImage(this.exportForm.controls.name.value, this.svgService.entry, this.selectExport[2]);
    }

    saveAsBMP(): void {
        exportImage(this.exportForm.controls.name.value, this.svgService.entry, this.selectExport[3]);
    }

    getNameErrorMessage() {
        return this.exportForm.controls.name.hasError('required') ? 'You must enter a name' : '';
    }

    getExportErrorMessage() {
        return this.exportForm.controls.export.hasError('required') ? 'You must select an export format' : '';
    }

    checkButton(): void {
        this.enable =  this.exportForm.valid;
    }

    onClick(exportType: string) {
        this.option = exportType;
    }

    submit(): void {
        this.checkButton();
        switch (this.option) {
            case this.selectExport[0]:
                this.saveAsBMP();
                break;
            case this.selectExport[1]:
                this.saveAsPNG();
                break;
            case this.selectExport[2]:
                this.saveAsJPG();
                break;
            case this.selectExport[3]:
                this.saveAsBMP();
                break;
        }
    }

    private createExportForm(): void {
        const DEFAULT_NAME = 'Untitled';
        const DEFAULT_EXPORT = this.selectExport[0];
        const validators = [Validators.required];

        this.exportForm = this.formBuilder.group({
            name: [DEFAULT_NAME, validators],
            export: [DEFAULT_EXPORT, validators],
        });
        this.exportForm.controls.name.setValue(DEFAULT_NAME);
        this.exportForm.controls.export.setValue(DEFAULT_EXPORT);
    }
}
