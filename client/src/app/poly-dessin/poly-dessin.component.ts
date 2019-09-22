import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../../../common/communication/message';
import { IndexService } from '../../services/index/index.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

@Component({
  selector: 'app-poly-dessin',
  templateUrl: './poly-dessin.component.html',
  styleUrls: ['./poly-dessin.component.scss'],
})
export class PolyDessinComponent implements OnInit {

  constructor(private basicService: IndexService,
              private dialog: MatDialog,
  ) {
    this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);
  }
  readonly title: string = 'LOG2990';
  keyEvent: KeyboardEvent;
  key: string;

  message = new BehaviorSubject<string>('');
  displayNewDrawing = true;
  @ViewChild(NewDrawingComponent, { static: false })
  newDrawingComponent: NewDrawingComponent;

  ngOnInit() {
    this.openModal();
  }

  openModal() {
    this.dialog.open(NewDrawingComponent, {
      height: '670px',
      width: '400px',
    });
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
  changeDisplay(display: boolean) {
    this.displayNewDrawing = display;
  }

}
