import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntryPointComponent } from 'src/app/entry-point/entry-point.component';
import { NewDrawingComponent } from 'src/app/new-drawing/new-drawing.component';
import { GalleryOptionComponent } from './../../app/toolbar/gallery-option/gallery-option.component';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private isClosedWelcome = new BehaviorSubject<boolean>(false);

    constructor(private dialog: MatDialog) { }

    get isClosedWelcomeObservable(): Observable<boolean> {
        return this.isClosedWelcome.asObservable();
    }

    openNewDrawing(): MatDialogRef<NewDrawingComponent> {
        return this.dialog.open(NewDrawingComponent);
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

    openGallery(): MatDialogRef<GalleryOptionComponent> {
        return this.dialog.open(GalleryOptionComponent);
    }
}
