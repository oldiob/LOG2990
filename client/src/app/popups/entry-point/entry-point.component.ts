import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss'],
})
export class EntryPointComponent implements OnInit {
  pressHide = false;
  constructor(private dialogRef: MatDialogRef<EntryPointComponent>) { }

  ngOnInit() {
    //
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

}
