import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../../../../common/communication/message';
import { DialogService } from '../dialog/dialog.service';
import { IndexService } from '../index/index.service';

@Injectable({
  providedIn: 'root',
})
export class DrawAreaService {
  localMessage = '1';
  message = new BehaviorSubject<string>('');
  isSavedDrawing: boolean;
  constructor(private basicService: IndexService) {
    this.isSavedDrawing = true;

    this.basicService.basicGet()
      .pipe(
        map((message: Message) => `${message.title} ${message.body}`),
      )
      .subscribe(this.message);

    this.basicService.getSVGObjects().subscribe((messageR : Message) => {
      this.localMessage = messageR.body;
    });
  }

  save() {
    this.isSavedDrawing = true;
    const newMessage: Message = {
      body : 'ba',
      title : 'ab',
    };

    alert(this.localMessage);
  }

  dirty() {
    this.isSavedDrawing = false;
  }
}
