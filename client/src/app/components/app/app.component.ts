import {Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, /*MatDialogConfig*/ } from '@angular/material';
import { EntryPointComponent } from '../entry-point/entry-point.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }
  // À mettre dans la vue dessin
  ngOnInit(): void {
    if (!sessionStorage.getItem('result') || sessionStorage.getItem('result') === 'false' ) {
    this.openDialog();
    }
}
openDialog(): void {
  const dialogConfig: MatDialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  this.dialog.open(EntryPointComponent, dialogConfig).afterClosed().subscribe((result: boolean) => {
    sessionStorage.setItem('result', JSON.stringify(result));
  });
}
}
