import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PencilService {

  componentID = 0;

  constructor() {
    //
   }
   assignID(): number {
    this.componentID++;
    const uniqueID = this.componentID;
    return uniqueID;
   }
   getComponentID() : number {
    return this.componentID;
   }
}
