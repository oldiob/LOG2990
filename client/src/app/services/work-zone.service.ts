import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkZoneService {
  private width: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentWidth: Observable<number> = this.width.asObservable();

  private height: BehaviorSubject<number>  = new BehaviorSubject<number>(0);
  currentHeight: Observable<number> = this.height.asObservable();

  private backgroundColor: BehaviorSubject<string> = new BehaviorSubject<string>('#ffffff');
  currentBackgroundColor = this.backgroundColor.asObservable();

  // Work-area's maximum dimensions
  private maxWidth: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentMaxWidth = this.maxWidth.asObservable();

  private maxHeight: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentMaxHeight = this.maxHeight.asObservable();

  constructor() {

  }

  getCurrentWidth(): Observable<number> {
    return this.width.asObservable();
  }
  getCurrentHeight(): Observable<number> {
    return this.height.asObservable();
  }

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
