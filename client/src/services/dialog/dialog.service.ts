import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar, MatSnackBarRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { CustomAlertComponent } from 'src/app/popups/custom-alert/custom-alert.component';
import { EntryPointComponent } from 'src/app/popups/entry-point/entry-point.component';
import { LoadDrawingComponent } from 'src/app/popups/load-drawing/load-drawing.component';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private isClosedWelcome = new BehaviorSubject<boolean>(false);
    private isClosedColor = new BehaviorSubject<boolean>(false);

    isClosedWelcomeObservable = this.isClosedWelcome.asObservable();
    isClosedColorObservable = this.isClosedColor.asObservable();

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

    openEntryPoint(cookie: string): void {
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;

        this.dialog.open(EntryPointComponent, dialogConfig).afterClosed().subscribe((result: boolean) => {
            sessionStorage.setItem(cookie, JSON.stringify(result));
            if (typeof result !== 'undefined') {
                this.isClosedWelcome.next(true);
            }
        });
    }

    openDialog(component: ComponentType<any>): MatDialogRef<any> {
        return this.dialog.open(component);
    }

    closeColorForms(): void {
        const IS_OPEN = false;
        this.isClosedColor.next(IS_OPEN);
    }

    openSnack(component: ComponentType<any>): MatSnackBarRef<any> {
        return this.snackBar.openFromComponent(component, {
            duration: 2000,
        });
    }

    alertLoading(object: any): MatDialogRef<LoadDrawingComponent> {
        const loadingDialogRef = this.openDialog(LoadDrawingComponent);
        loadingDialogRef.componentInstance.content = `Saving "${object}" ...`;
        return loadingDialogRef;
    }

    alertSuccess(title: string, content: string): void {
        const snackRef = this.openSnack(CustomAlertComponent);
        snackRef.instance.title = title;
        snackRef.instance.content = content;
        snackRef.instance.isSuccess = true;
    }

    alertError(title: string, content: string): void {
        const snackRef = this.openSnack(CustomAlertComponent);
        snackRef.instance.title = title;
        snackRef.instance.content = content;
        snackRef.instance.isError = true;
    }
}
