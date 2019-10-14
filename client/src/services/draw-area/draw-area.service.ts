import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Drawing } from './i-drawing';
import { map } from 'rxjs/operators';
import { Message } from '../../../../common/communication/message';
import { DialogService } from '../dialog/dialog.service';
import { IndexService } from '../index/index.service';

@Injectable({
    providedIn: 'root',
})
export class DrawAreaService {

  drawings: BehaviorSubject<Drawing[]>;
  localMessage = '1';
  message = new BehaviorSubject<string>('');
  isSavedDrawing: boolean;
  constructor(private basicService: IndexService) {
    this.isSavedDrawing = true;
    const INITIAL_DRAWINGS: Drawing[] = [];
    this.drawings = new BehaviorSubject(INITIAL_DRAWINGS);

    this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);

    this.basicService.getSVGObjects().subscribe((messageR : Message) => {
      this.localMessage = messageR.body;
    });
  }

  save(drawing: Drawing): void {
    this.isSavedDrawing = true;
    const newMessage: Message = {
      body : 'ba',
      title : 'ab',
    };

    alert(this.localMessage);
     // ! Remove following once server is implemented
     this.drawings.value.push(drawing);
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
