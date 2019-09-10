import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent implements OnInit {

  enableButton: boolean;

  constructor(
    public dialogRef: MatDialogRef<EntryPointComponent>,
  ) { }

  ngOnInit() { //
    this.enableButton = false;
  }

  checkButton(event: MouseEvent): void {
    this.enableButton = true;
  }

  close(event: MouseEvent): void {
    this.dialogRef.close('Close');
  }

}
