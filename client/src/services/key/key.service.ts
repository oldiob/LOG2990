import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  isKeysEnabled = true;
  isTextEnabled = true;
  constructor() {
    //
   }

  disableShortcut() {
      this.isKeysEnabled = false;
  }
  enableShortcut() {
      this.isKeysEnabled = true;
  }
  enableTextEdit() {
      this.isTextEnabled = true;
  }
  disableTextEdit() {
      this.isTextEnabled = false;
  }
}
