import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';
import { DialogService } from 'src/services/dialog/dialog.service';
import { DrawAreaService } from 'src/services/draw-area/draw-area.service';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

const REBASE = /.*.rebase$/;

@Component({
    selector: 'app-import-option',
    templateUrl: './import-option.component.html',
    styleUrls: ['./import-option.component.scss'],
})
export class ImportOptionComponent implements OnInit {

    enableFile: boolean;
    enable: boolean;

    selectFile: HTMLInputElement;

    requiredForm: FormGroup;
    importFile: File;
    readFile: FileReader;

    constructor(
        private workZoneService: WorkZoneService,
        private drawAreaService: DrawAreaService,
        private dialogService: DialogService,
    ) {
        this.readFile = new FileReader();
        this.enableFile = false;
    }

    protected validationMessages: { 'importImage': { type: string; message: string; }[] } = {
        importImage: [
            { type: 'required', message: 'File required' },
            { type: 'pattern', message: 'Only ".rebase" files are allowed. Please select another file.' },
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
            this.enableFile = true;
            this.checkButton();
        };
        this.readFile.readAsText(this.importFile);
    }

    checkButton(): void {
        this.enable = (this.requiredForm.valid && this.enableFile);
    }

    submit(event: MouseEvent): void {
        this.checkButton();

        if (!this.drawAreaService.isSaved) {
            const dialogRef = this.dialogService.openDialog(ConfirmationComponent);
            dialogRef.afterClosed().subscribe(() => {
                this.importOnArea();
                this.drawAreaService.save();
            });
        } else {
            this.importOnArea();
            this.drawAreaService.save();
        }
    }

    private importOnArea() {
        const res: Drawing = JSON.parse(this.readFile.result as string);
        Object.setPrototypeOf(res, Drawing.prototype);
        this.workZoneService.setFromDrawing(res);
    }
}
