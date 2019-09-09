import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkZoneService {
  private width = new BehaviorSubject<number>(0);
  currentWidth = this.width.asObservable();

  private height = new BehaviorSubject<number>(0);
  currentHeight = this.height.asObservable();

  private backgroundColor = new BehaviorSubject<string>('#ffffff');
  currentBackgroundColor = this.backgroundColor.asObservable();

  // Work-area's maximum dimensions
  private maxWidth = new BehaviorSubject<number>(0);
  currentMaxWidth = this.maxWidth.asObservable();

  private maxHeight = new BehaviorSubject<number>(0);
  currentMaxHeight = this.maxHeight.asObservable();

  constructor() { }

  updateDrawAreaDimensions(width?: number, height?: number, bgColor?: string) {
    if (width) {
      this.width.next(width);
    }
    if (height) {
      this.height.next(height);
    }
    if (bgColor) {
      this.backgroundColor.next(bgColor);
    }
  }

  // Updates Work Zone initial dimensions values
  updateInitialDimensions(maxWidth?: number, maxHeight?: number): void {
    if (maxWidth) {
      this.maxWidth.next(maxWidth);
    }
    if (maxHeight) {
      this.maxHeight.next(maxHeight);
    }
  }
}
