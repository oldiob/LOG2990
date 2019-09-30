import { Component, Inject, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';

class DialogData {
    apply: boolean;
    current: Color;
    history: Color[];
}

declare type dialogCallback = (result: DialogData) => void;

@Component({
    selector: 'app-color-option',
    templateUrl: './color-option.component.html',
    styleUrls: ['./color-option.component.scss', '../toolbar-option.scss'],
})
export class ColorOptionComponent implements OnInit {

    constructor(private paletteService: PaletteService,
        private dialog: MatDialog) { }

    ngOnInit() { }

    get primary(): string { return this.paletteService.getPrimary(); }

    get secondary(): string { return this.paletteService.getSecondary(); }

    swap(): void { this.paletteService.swap(); }

    selectPrimary(): void {
        this.openDialog(this.paletteService.primary, (result: DialogData) => {
            if (result.apply) {
                this.paletteService.selectPrimary(
                    result.current.red,
                    result.current.green,
                    result.current.blue,
                    result.current.alpha,
                );
            }
        });
    }

    selectSecondary(): void {
        this.openDialog(this.paletteService.secondary, (result: DialogData) => {
            if (result.apply)
                this.paletteService.selectSecondary(
                    result.current.red,
                    result.current.green,
                    result.current.blue,
                    result.current.alpha,
                )
        });
    }

    private openDialog(current: Color, callback: DialogCallback) {
        const history = this.paletteService.getHistory();
        const dialogRef = this.dialog.open(ColorDialog, {
            data: {
                current: current, history: history
            },
            width: '50%',
            height: '420px',
        });
        dialogRef.afterClosed().subscribe(callback);
    }
}

@Component({
    selector: 'color-dialog',
    templateUrl: './color-dialog.html',
})
export class ColorDialog {
    private newCurrent: Color;
    constructor(public dialogRef: MatDialogRef<ColorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.newCurrent = data.current;
    }

    close() {
        this.data.apply = false;
        this.dialogRef.close(this.data);
    }
    save() {
        this.data.apply = true;
        this.data.current = this.newCurrent;
        this.dialogRef.close(this.data);
    }

    selectCurrent(color: Color) {
        this.newCurrent = color;
    }
}
