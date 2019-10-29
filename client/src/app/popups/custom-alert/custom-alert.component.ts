import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

@Component({
    selector: 'app-custom-alert',
    templateUrl: './custom-alert.component.html',
    styleUrls: ['./custom-alert.component.scss'],
})
export class CustomAlertComponent implements OnInit {
    title: string;
    content: string;

    isError: boolean;
    isSuccess: boolean;

    constructor(private snackRef: MatSnackBarRef<CustomAlertComponent>) {
        //
    }

    ngOnInit() {
        this.isError = false;
        this.isSuccess = false;
    }

    onDismiss() {
        this.snackRef.dismiss();
    }
}
