import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  private isBlocking = false;
  private isDisableText = false;
  constructor() {
    //
   }

  getIsBlocking() {
      return this.isBlocking;
  }

  setIsBlocking(isBlocking: boolean) {
      this.isBlocking = isBlocking;
  }

  getIsDisableText() {
      return this.isDisableText;
  }

  setIsDisableText(isDisableText: boolean) {
      this.isDisableText = isDisableText;
  }
}
