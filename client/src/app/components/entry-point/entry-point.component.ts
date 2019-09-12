import { Component, OnInit } from '@angular/core';
import { MatDialog, /*MatDialogConfig*/ MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EntryPointComponent>, public dialog: MatDialog,
  ) { }

  enableButton: boolean;
  checkoutBox: boolean;

  ngOnInit() {
    this.enableButton = false;
  }
  checkButton(event: MouseEvent): void {
    this.enableButton = true;
  }

  close(event: MouseEvent): void {
    this.dialogRef.close(this.enableButton);
  }
}
