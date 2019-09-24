import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawAreaService {

  isSaveDrawing: boolean;
  constructor() {
    this.isSaveDrawing = false;
  }

  save() {
    this.isSaveDrawing = true;
  }

  dirty() {
    this.isSaveDrawing = false;
  }
}
