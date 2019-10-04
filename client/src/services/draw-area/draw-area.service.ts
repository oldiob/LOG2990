import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../../../../common/communication/message';
import { IndexService } from '../index/index.service';

@Injectable({
  providedIn: 'root',
})
export class DrawAreaService {
  message = new BehaviorSubject<string>('');
  isSavedDrawing: boolean;
  constructor(private basicService: IndexService) {
    this.isSavedDrawing = true;
  }

  save() {
    this.isSavedDrawing = true;
    const newMessage: Message = {
      body : 'ba',
      title : 'ab',
    };

    alert('abc');
  }

  dirty() {
    this.isSavedDrawing = false;
  }
}
