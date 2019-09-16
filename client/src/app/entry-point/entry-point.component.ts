import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent implements OnInit {
  KEYDOWN = 'keydown';
  KEYPRESS = 'keypress';
  enableButton: boolean;
  pressHide: boolean;

  constructor(
    public dialogRef: MatDialogRef<EntryPointComponent>, public dialog: MatDialog) {
    }

  constructor(
    public dialogRef: MatDialogRef<EntryPointComponent>, public dialog: MatDialog) {
   }

  ngOnInit() {
    this.pressHide = false;
  }

  close(event: MouseEvent): void {
    this.dialogRef.close(this.pressHide);
  }

  // prevent keyboard event
  @HostListener('window: keydown', ['$event'])
  @HostListener('window: keypress', ['$event'])
  disableKeyboard(event: KeyboardEvent) {
      event.preventDefault();
      event.stopPropagation();
    }
<<<<<<< HEAD:client/src/app/entry-point/entry-point.component.ts

=======
  }

  // prevent keyboard event
  @HostListener('window: keydown', ['$event'])
  @HostListener('window: keypress', ['$event'])
  disableKeyboard(event: KeyboardEvent) {
    if (event.type === this.KEYDOWN || event.type === this.KEYPRESS) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
>>>>>>> Add Missing EntryPoint:client/src/app/components/entry-point/entry-point.component.ts
}
