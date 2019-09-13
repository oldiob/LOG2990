import {Component, HostListener, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig, /*MatDialogConfig*/ } from '@angular/material';
import { EntryPointComponent } from '../entry-point/entry-point.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  event: KeyboardEvent;
  press: boolean;
  preventKeyboard: boolean;

  constructor(public dialog: MatDialog) {
    this.press = false;
    this.preventKeyboard = false;
  }
  // À mettre dans la vue dessin
  ngOnInit(): void {
    if (!sessionStorage.getItem('result') || sessionStorage.getItem('result') === 'false' ) {
    this.openEntryDialog();
    }
}

// @HostListener('window: keydown', ['$event'])
//   preventkeyboardEvent(event: KeyboardEvent) {
//     event.preventDefault();
//     event.returnValue = false;
//  }

  // Test avec une touche quelconque
  @HostListener('window: keydown', ['$event'])
  keyboardEvent(eventKeyboard: KeyboardEvent) {
    if (this.preventKeyboard) {
      if (eventKeyboard.key === 't') {
        this.press = !this.press;
      }
    }
  }

openEntryDialog(): void {
  const dialogConfig: MatDialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  this.dialog.open(EntryPointComponent, dialogConfig).afterClosed().subscribe((result: boolean) => {
    sessionStorage.setItem('result', JSON.stringify(result));
    this.preventKeyboard = true;
  });
}
}
