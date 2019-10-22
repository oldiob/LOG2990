import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntryPointComponent } from 'src/app/entry-point/entry-point.component';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private isClosedWelcome = new BehaviorSubject<boolean>(false);
    keyEnable = false;

    isClosed = false;
    constructor(private dialog: MatDialog) { }

    get isClosedWelcomeObservable(): Observable<boolean> {
        return this.isClosedWelcome.asObservable();
    }

    openEntryPoint(cookie: string): void {
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;

        this.dialog.open(EntryPointComponent, dialogConfig).afterClosed().subscribe((result: boolean) => {
            sessionStorage.setItem(cookie, JSON.stringify(result));
            if (typeof result !== 'undefined') {
                this.isClosed = true;
                this.isClosedWelcome.next(this.isClosed);
            }
        });
    }

    open(component: ComponentType<any>): MatDialogRef<any> {
        const ref = this.dialog.open(component);
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
