import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawAreaService {

  isSavedDrawing: boolean;
  constructor() {
    this.isSavedDrawing = true;
  }

  save() {
    this.isSavedDrawing = true;
  }

  dirty() {
    this.isSavedDrawing = false;
  }
}
