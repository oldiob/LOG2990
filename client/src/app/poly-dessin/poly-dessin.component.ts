import { Component, HostListener, OnInit } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';

@Component({
  selector: 'app-poly-dessin',
  templateUrl: './poly-dessin.component.html',
  styleUrls: ['./poly-dessin.component.scss'],
})
export class PolyDessinComponent implements OnInit {
  constructor(
    private dialogService: DialogService) {
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
          this.dialogService.openNewDrawing();
        }
      });
    } else {
      this.dialogService.openNewDrawing();
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
