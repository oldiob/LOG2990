import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Data } from '@angular/router';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

const REBASE = /.*.rebase$/;

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {

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
        private workZoneService: WorkZoneService,
        @Inject(MAT_DIALOG_DATA) public data: Data,
    ) {
        this.readFile = new FileReader();
        this.enableFile = false;
        this.importImage = new Image();
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

    getFile(event: KeyboardEvent): void {
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
        const res: Drawing = JSON.parse(this.reader.result as string);
        Object.setPrototypeOf(res, Drawing.prototype);
        this.workZoneService.setFromDrawing(res);
        this.close(new MouseEvent('click'));
    }

    close(event: MouseEvent): void {
        this.dialogRef.close();
    }
}
