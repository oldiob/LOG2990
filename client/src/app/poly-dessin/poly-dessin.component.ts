import { Component, HostListener, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

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
    this.dialogService.openNewDrawing(NewDrawingComponent);
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
