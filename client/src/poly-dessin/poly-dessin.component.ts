import { OnInit, Component, HostListener, ViewChild } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Message} from '../../../../../common/communication/message';
import {IndexService} from '../../services/index/index.service';
import { NewDrawingComponent } from '../new-drawing/new-drawing.component';

@Component({
  selector: 'app-poly-dessin',
  templateUrl: './poly-dessin.component.html',
    styleUrls: ['./poly-dessin.component.scss'],
})
export class PolyDessinComponent implements OnInit {

  constructor(private basicService: IndexService) {
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
  @ViewChild(NewDrawingComponent, {static: false})
  newDrawingComponent: NewDrawingComponent;

  ngOnInit() {
   // this.displayNewDrawing = this.newDrawingComponent.displayNewDrawing;
  }
  @HostListener('document:keypress', ['$event']) // need refactor
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyEvent = event;
    this.key = this.keyEvent.key;
  }
  @HostListener('document:keydown', ['$event']) // need refactor
  handleKeyboardEventDown(event: KeyboardEvent) {
    this.keyEvent = event;
  }
  changeDisplay(display: boolean) {
    this.displayNewDrawing = display;
  }

}
