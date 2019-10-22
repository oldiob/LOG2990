import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../../../common/communication/message';
import { IndexService } from '../index/index.service';
import { WebClientService } from '../web-client/web-client.service';
import { Drawing } from './i-drawing';

@Injectable({
    providedIn: 'root',
})
export class DrawAreaService {

  drawings: BehaviorSubject<Drawing[]>;

  localMessage: string;
  message = new BehaviorSubject<string>('');
  isSavedDrawing: boolean;
  count = 0;
  page: any;
  constructor(
      private basicService: IndexService,
      private webClientServer: WebClientService) {

    this.isSavedDrawing = true;
    const INITIAL_DRAWINGS: Drawing[] = [];
    this.drawings = new BehaviorSubject(INITIAL_DRAWINGS);

    this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);

    this.webClientServer.getMessage().subscribe((messageR: Message) => {
      this.localMessage = messageR.body;
    });
  }

  save(drawing: Drawing): void {
      this.isSavedDrawing = true;

      this.webClientServer.sendDrawing(drawing);
  }

  dirty() {
    this.isSavedDrawing = false;
  }
  // TODO: Fetch a list of saved drawings (id: number, name: string, tag: string[], thumbnail: JPEG) from server
  fetch(id: number) {
    //
  }

// TODO: Fetch a drawing (objects containing infos on svg elements)
  fetchSVGInfos() {
      //
  }
}
