import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  private isBlocking = false;
  constructor() {
    //
   }

  getIsBlocking() {
      return this.isBlocking;
  }

  setIsBlocking(isBlocking: boolean) {
      this.isBlocking = isBlocking;
  }
}
