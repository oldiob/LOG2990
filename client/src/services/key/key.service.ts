import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  isShortcutsEnabled = true;
  isTextEnabled = true;
  constructor() {
    //
   }

  disableKeys() {
      this.isShortcutsEnabled = false;
  }
  enableKeys() {
      this.isShortcutsEnabled = true;
  }
  enableTextEdit() {
      this.isTextEnabled = true;
  }
  disableTextEdit() {
      this.isTextEnabled = false;
  }
}
