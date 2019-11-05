import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drawing } from '../draw-area/i-drawing';
import { SVGService } from '../svg/svg.service';
import { populateDrawArea } from 'src/utils/element-parser';

@Injectable({
    providedIn: 'root',
})
export class WorkZoneService {
    // Work-area's dimensions
    private width = new BehaviorSubject<number>(0);
    private height = new BehaviorSubject<number>(0);
    private backgroundColor = new BehaviorSubject<string>('#ffffff');

    // Work-area's maximum dimensions
    private maxWidth = new BehaviorSubject<number>(0);
    private maxHeight = new BehaviorSubject<number>(0);

    constructor(private svgService: SVGService) {}

    get currentWidth(): Observable<number> {
        return this.width.asObservable();
    }
    get currentHeight(): Observable<number> {
        return this.height.asObservable();
    }
    get currentBackgroundColor(): Observable<string> {
        return this.backgroundColor.asObservable();
    }
    get currentMaxWidth(): Observable<number> {
        return this.maxWidth.asObservable();
    }
    get currentMaxHeight(): Observable<number> {
        return this.maxHeight.asObservable();
    }

    setLoadedDrawing(drawing: Drawing) {
        this.svgService.clearObjects();
        populateDrawArea(this.svgService, drawing.holder);
        this.updateDrawAreaProperties(drawing.width, drawing.height, drawing.backgroundColor);
    }

    updateDrawAreaProperties(width: number, height: number, bgColor: string) {
        this.width.next(width);
        this.height.next(height);
        this.backgroundColor.next(bgColor);
    }

    // Updates Work Zone initial dimensions values
    updateInitialDimensions(maxWidth: number, maxHeight: number): void {
        this.maxWidth.next(maxWidth);
        this.maxHeight.next(maxHeight);
    }
    updateBackgroundColor(color: string): void {
        this.backgroundColor.next(color);
    }
}
