import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drawing } from '../draw-area/i-drawing';
import { SVGService } from '../svg/svg.service';
import { populateDrawArea, serializeDrawArea } from 'src/utils/element-parser';
import { MyInjector } from 'src/utils/injector';

@Injectable({
    providedIn: 'root',
})
export class WorkZoneService {

    private widthValue: number;
    private heightValue: number;
    private backgroundColorValue: string;

    // Work-area's dimensions
    private width: BehaviorSubject<number>;
    private height: BehaviorSubject<number>;
    private backgroundColor: BehaviorSubject<string>;

    private maxWidth: BehaviorSubject<number>;
    private maxHeight: BehaviorSubject<number>;

    constructor() {
        this.widthValue = 0;
        this.heightValue = 0;
        this.backgroundColorValue = '#ffffffff';

        this.width = new BehaviorSubject<number>(this.widthValue);
        this.height = new BehaviorSubject<number>(this.heightValue);
        this.backgroundColor = new BehaviorSubject<string>(this.backgroundColorValue);

        this.maxWidth = new BehaviorSubject<number>(this.widthValue);
        this.maxHeight = new BehaviorSubject<number>(this.heightValue);
    }

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

    setFromDrawing(drawing: Drawing): void {
        const svgService: SVGService = MyInjector.get(SVGService);

        svgService.clearObjects();
        populateDrawArea(svgService, drawing.holder);
        this.updateDrawAreaProperties(drawing.width, drawing.height, drawing.backgroundColor);
    }

    getAsDrawing(): Drawing {
        const svgService: SVGService = MyInjector.get(SVGService);

        const drawing: Drawing = new Drawing();

        drawing.width = this.widthValue;
        drawing.height = this.heightValue;
        drawing.backgroundColor = this.backgroundColorValue;
        drawing.holder = serializeDrawArea(svgService);

        return drawing;
    }

    updateDrawAreaProperties(width: number, height: number, bgColor: string) {
        this.width.next(width);
        this.height.next(height);
        this.backgroundColor.next(bgColor);

        this.widthValue = width;
        this.heightValue = height;
        this.backgroundColorValue = bgColor;
    }

    // Updates Work Zone initial dimensions values
    updateMaxDimensions(maxWidth: number, maxHeight: number): void {
        this.maxWidth.next(maxWidth);
        this.maxHeight.next(maxHeight);
    }
}
