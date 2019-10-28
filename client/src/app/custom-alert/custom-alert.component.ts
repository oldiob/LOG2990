import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

@Component({
    selector: 'app-custom-alert',
    templateUrl: './custom-alert.component.html',
    styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent implements OnInit {
    data: string;
    constructor(private snackRef: MatSnackBarRef<CustomAlertComponent>) {
        //
    }

    ngOnInit() {
        //
    }

    onDismiss() {
        this.snackRef.dismiss();
    }
}
