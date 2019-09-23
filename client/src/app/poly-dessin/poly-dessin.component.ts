import { Component, HostListener, OnInit } from '@angular/core';
import { NewDrawingComponent } from 'src/app/new-drawing/new-drawing.component';
import { DialogService } from 'src/services/dialog/dialog.service';

@Component({
  selector: 'app-poly-dessin',
  templateUrl: './poly-dessin.component.html',
  styleUrls: ['./poly-dessin.component.scss'],
})
export class PolyDessinComponent implements OnInit {

  constructor(private dialogService: DialogService) {
  }
  keyEvent: KeyboardEvent;
  key: string;

  ngOnInit() {
    const IS_OPEN_ENTRY_DIALOG = true;
    this.dialogService.openNewDrawing(NewDrawingComponent, IS_OPEN_ENTRY_DIALOG);
  }

  @HostListener('document:keypress', ['$event']) // need refactor
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyEvent = event;
    this.key = this.keyEvent.key;
  }
  @HostListener('document:keydown', ['$event']) // need refactor
  handleKeyboardEventDown(event: KeyboardEvent) {
    this.keyEvent = event;
    this.key = '';
  }
}
