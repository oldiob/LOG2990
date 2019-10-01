import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent implements OnInit {
  pressHide: boolean = false;
  constructor(public dialogRef: MatDialogRef<EntryPointComponent>,
              public dialog: MatDialog) { }

  ngOnInit() { }

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

}
