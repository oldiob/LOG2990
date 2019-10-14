import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogService } from 'src/services/dialog/dialog.service';
import { NewDrawingComponent } from './../new-drawing/new-drawing.component';
import { Message } from '../../../../common/communication/message';
import {IndexService} from '../../services/index/index.service';

@Component({
  selector: 'app-poly-dessin',
  templateUrl: './poly-dessin.component.html',
  styleUrls: ['./poly-dessin.component.scss'],
})
export class PolyDessinComponent implements OnInit {
  message = new BehaviorSubject<string>('');
  constructor(
    private dialogService: DialogService, private basicService: IndexService) {
      this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);

      /*
      this.workZoneService.currentWidth.subscribe(
        (width: number) => this.width = width,
    );
    */
  }
  keyEvent: KeyboardEvent;
  key: string;

  ngOnInit() {
    const IS_HIDDEN_WELCOME = 'false';
    const WELCOME_DIALOG_COOKIE = 'HideWelcomeDialog';

    const IS_SHOW_WELCOME: boolean =
      (!sessionStorage.getItem(WELCOME_DIALOG_COOKIE) || sessionStorage.getItem(WELCOME_DIALOG_COOKIE) === IS_HIDDEN_WELCOME);
    if (IS_SHOW_WELCOME) {
      this.dialogService.openEntryPoint(WELCOME_DIALOG_COOKIE);

      this.dialogService.isClosedWelcomeObservable.subscribe((isClosedWelcome: boolean) => {
        if (isClosedWelcome) {
          this.dialogService.open(NewDrawingComponent);
        }
      });
    } else {
      this.dialogService.open(NewDrawingComponent);
    }
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
