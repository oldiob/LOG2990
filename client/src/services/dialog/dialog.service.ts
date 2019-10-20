import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntryPointComponent } from 'src/app/entry-point/entry-point.component';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private isClosedWelcome = new BehaviorSubject<boolean>(false);
    keyEnable = false;

    constructor(private dialog: MatDialog) { }

    get isClosedWelcomeObservable(): Observable<boolean> {
        return this.isClosedWelcome.asObservable();
    }

    openEntryPoint(cookie: string): void {
        let isClosed = false;
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;

        this.dialog.open(EntryPointComponent, dialogConfig).afterClosed().subscribe((result: boolean) => {
            sessionStorage.setItem(cookie, JSON.stringify(result));
            if (typeof result !== 'undefined') {
                isClosed = true;
                this.isClosedWelcome.next(isClosed);
            }
        });
    }

    open(component: ComponentType<any>): MatDialogRef<any> {
        const ref = this.dialog.open(component)
        ref.afterClosed().subscribe((result: boolean) => {
          this.enableKey();
        });
        return ref;
    }

    disableKey() {
        this.keyEnable = false;
    }
    enableKey() {
        this.keyEnable = true;
    }
}
