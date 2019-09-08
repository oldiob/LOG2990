import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EntryPointComponent>,
  ) { }

  ngOnInit() { //
  }

  close(): void {
    this.dialogRef.close('Close');
  }

}
