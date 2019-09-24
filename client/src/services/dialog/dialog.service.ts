import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EntryPointComponent } from 'src/app/entry-point/entry-point.component';
import { NewDrawingComponent } from 'src/app/new-drawing/new-drawing.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openNewDrawing(newDrawingComponent: ComponentType<NewDrawingComponent>, isOpenEntryDialog: boolean) {
    this.dialog.open(newDrawingComponent, {
      height: '700px',
      width: '500px',
      data: isOpenEntryDialog,
    });
  }

  // open entry point dialog
  openEntryPoint(cookie: string): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(EntryPointComponent, dialogConfig).afterClosed().subscribe((result: boolean) => {
      sessionStorage.setItem(cookie, JSON.stringify(result));
    });
  }
}
