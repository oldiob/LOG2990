import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Data } from '@angular/router';
import { populateDrawArea } from 'src/utils/element-parser';
import { MyInjector } from 'src/utils/injector';
import { SVGService } from 'src/services/svg/svg.service';
import { DrawAreaHolder } from 'src/services/draw-area/draw-area-holder';

const REBASE = '[^ @]*.rebase';

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {

    uploadFile: boolean;
    enableFile: boolean;
    enable: boolean;

    selectFile: HTMLInputElement;

    requiredForm: FormGroup;
    importFile: File;
    reader: FileReader;

    constructor(
        public dialogRef: MatDialogRef<ImportComponent>,
        public http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: Data,
    ) {
        this.reader = new FileReader();
        this.uploadFile = false;
        this.enableFile = false;
    }

    protected validationMessages: { 'importImage': { type: string; message: string; }[] } = {
        importImage: [
            { type: 'required', message: 'File required' },
            { type: 'pattern', message: 'Only .rebase files are allowed' },
        ],
    };

    ngOnInit(): void {
        this.enable = false;
        this.requiredForm = new FormGroup({
            importImage: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(REBASE),
            ])),
        });
    }

    getFile(event: Event): void {
        this.uploadFile = true;
        this.selectFile = event.currentTarget as HTMLInputElement;
        if (this.selectFile.files !== null) {
            this.importFile = this.selectFile.files[0];
        }


        this.reader.onload = () => {
            const res: DrawAreaHolder = JSON.parse(this.reader.result as string);
            Object.setPrototypeOf(res, DrawAreaHolder.prototype);
            populateDrawArea(MyInjector.get(SVGService), res);
        };

        this.reader.readAsText(this.importFile);
    }

    checkButton(): void {
        this.enable = (this.requiredForm.valid && this.enableFile);
    }

    submit(event: MouseEvent): void {
        this.checkButton();
    }

    close(event: MouseEvent): void {
        this.dialogRef.close();
    }
}
