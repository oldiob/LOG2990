import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Data } from '@angular/router';

const SVG = '[^ @]*.svg';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {

    uploadFile: boolean;
    enableFile: boolean;
    enable: boolean;

    importImage: HTMLImageElement;
    selectFile: HTMLInputElement;

    requiredForm: FormGroup;
    importFile: File;
    readFile: FileReader;

    constructor(
        public dialogRef: MatDialogRef<ImportComponent>,
        public http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: Data,
    ) {
        this.readFile = new FileReader();
        this.uploadFile = false;
        this.enableFile = false;
        this.importImage = new Image();
    }

    protected validationMessages: {'importImage': {type: string; message: string; } [] }  =  {
        importImage : [
        { type: 'required', message: 'File required' },
        { type: 'pattern', message: 'Only .bmp, .jpg, .svg and .png are allowed' },
        ],
    };

    ngOnInit(): void {
        this.enable = false;
        this.requiredForm = new FormGroup({
            importImage: new FormControl ('', Validators.compose([
                Validators.required,
                Validators.pattern(SVG),
            ])),
        });
    }

    getFile(event: KeyboardEvent): void {
            this.uploadFile = true;
            this.selectFile = event.currentTarget as HTMLInputElement;
            if (this.selectFile.files !== null) {
                this.importFile = this.selectFile.files[0];
            }
            this.readFile.onload = () => {

                this.importImage.onload = () => {
                    this.enableFile = true;
                    this.checkButton();
                };
                this.importImage.src = this.readFile.result as string;
            };
            this.readFile.readAsDataURL(this.importFile);
    }

    checkButton(): void {
        this.enable = ( this.requiredForm.valid && this.enableFile);
    }

    submit(event: MouseEvent): void {
        this.checkButton();
    }

    close(event: MouseEvent): void {
        this.dialogRef.close();
    }
}
