import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThicknessService {
  private thickness: number;

  constructor() { 
    this.setThickness(1);
  }

  setThickness(thickness: number): void {
    if (thickness <= 0 || thickness > 20) {
      throw new Error("Invalid thickness " + thickness + ". Must be ]0, 20].")
    }

    this.thickness = thickness;
  }

  getThickness(): number {
    return this.thickness;
  }
}
