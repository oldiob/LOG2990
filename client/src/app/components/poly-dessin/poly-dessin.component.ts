import { Component, OnInit, HostListener } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Message} from '../../../../../common/communication/message';
import {IndexService} from '../../services/index/index.service';

@Component({
  selector: 'app-poly-dessin',
  templateUrl: './poly-dessin.component.html',
  styleUrls: ['./poly-dessin.component.scss']
})
export class PolyDessinComponent implements OnInit {
  readonly title: string = 'LOG2990';
  keyEvent: KeyboardEvent;
  key: string;
  message = new BehaviorSubject<string>('');

  constructor(private basicService: IndexService) {
    this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);
  }
  ngOnInit(): void {
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

}
