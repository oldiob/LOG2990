import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntryPointComponent } from 'src/app/entry-point/entry-point.component';
import { NewDrawingComponent } from 'src/app/new-drawing/new-drawing.component';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private isClosedWelcome = new BehaviorSubject<boolean>(false);
    UNDEFINED = 'undefined';
    constructor(private dialog: MatDialog) { }

    get isClosedWelcomeObservable(): Observable<boolean> {
        return this.isClosedWelcome.asObservable();
    }

    openNewDrawing(): void {
        this.dialog.open(NewDrawingComponent);
    }

    openEntryPoint(cookie: string): void {
        let isClosed = false;
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;

        this.dialog.open(EntryPointComponent, dialogConfig).afterClosed().subscribe((result: boolean) => {
            sessionStorage.setItem(cookie, JSON.stringify(result));
            if (typeof result !== this.UNDEFINED) {
                isClosed = true;
                this.isClosedWelcome.next(isClosed);
            }
        });
    }
}
