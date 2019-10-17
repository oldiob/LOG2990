import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../../../common/communication/message';
import { DialogService } from '../dialog/dialog.service';
import { IndexService } from '../index/index.service';
import { WebClientService } from '../web-client/web-client.service';

@Injectable({
  providedIn: 'root',
})
export class DrawAreaService {
  localMessage: string;
  message = new BehaviorSubject<string>('');
  isSavedDrawing: boolean;
  count = 0;
  page: any;
  constructor(private basicService: IndexService, private webClientServer: WebClientService) {
    this.isSavedDrawing = true;

    this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);

    this.webClientServer.getMessage().subscribe((messageR: Message) => {
      this.localMessage = messageR.body;
    });
  }

  save() {
    this.isSavedDrawing = true;
    this.webClientServer.sendDrawing();

    // this.webClientServer.sendDrawing();
/*
    if (this.count === 0) {
      this.webClientServer.sendDrawingTest();
      this.count++;
    } else if (this.count === 1) {
      this.webClientServer.getDrawingTest().subscribe((res) => console.log(res));
      console.log(this.page);
    }
    */
  }

  dirty() {
    this.isSavedDrawing = false;
  }
}
